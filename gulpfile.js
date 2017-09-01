'use strict';

const
  fs= require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  filesize = require('filesize'),
  ngc = require('@angular/compiler-cli/src/main').main,
  rollup = require('gulp-rollup'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  sassImage = require('gulp-sass-image'),
  gnf = require('gulp-npm-files'),
  del = require('del'),
  runSequence = require('run-sequence'),
  inlineResources = require('./tools/gulp/inline-resources');

const rootFolder = path.join(__dirname);
const srcFolder = path.join(rootFolder, 'src');
const srcImagesFolder = path.join(srcFolder, 'images');
const srcSCSSFolder = path.join(srcFolder, 'scss');
const tmpFolder = path.join(rootFolder, '.tmp');
const buildFolder = path.join(rootFolder, 'build');
const distFolder = path.join(rootFolder, 'dist');

const external = [
  '@angular/core',
  '@angular/common',
  '@angular/forms',
  '@angular/cdk/keycodes',
  '@angular/cdk/coercion',
  '@angular/cdk/a11y',
  '@angular/cdk/rxjs',
  'rxjs/observable/merge',
  'rxjs/Subject'
]

// Suppress `The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten` message.
// There are hundreds of them. Angular team says to ignore it.
// https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
const onwarn =function (warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
  }
  console.error(warning.message);
}


/**
 * 0. Generate helper SASS file fir better images inlining in `scss` files
 *    Allows to impoer `scss ` files from dist foler with out issues with images path resolution
 */
gulp.task('sass:images', function () {
    return gulp.src(`${srcImagesFolder}/**/*.+(jpeg|jpg|png|gif|svg)`)
        .pipe(sassImage({
            images_path: srcImagesFolder,
            css_path: `${tmpFolder}/css`
        }))
        .pipe(gulp.dest(srcSCSSFolder));
});

/**
 * 1. Delete /dist folder
 */
gulp.task('clean:dist', function() {

  // Delete contents but not dist folder to avoid broken npm links
  // when dist directory is removed while npm link references it.
  return deleteFolders([distFolder + '/**', '!' + distFolder]);
});

/**
 * 2. Clone the /src folder into /.tmp. If an npm link inside /src has been made,
 *    then it's likely that a node_modules folder exists. Ignore this folder
 *    when copying to /.tmp.
 */
gulp.task('copy:source', function() {
  return gulp.src([`${srcFolder}/**/*`, `!${srcFolder}/node_modules`])
    .pipe(gulp.dest(tmpFolder));
});

/**
 * 3. Inline template (.html) and style (.css) files into the the component .ts files.
 *    We do this on the /.tmp folder to avoid editing the original /src files
 */
gulp.task('inline-resources', function() {
  return Promise.resolve()
    .then(() => inlineResources(tmpFolder));
});


/**
 * 4. Run the Angular compiler, ngc, on the /.tmp folder. This will output all
 *    compiled modules to the /build folder.
 */
gulp.task('ngc', function() {
  return ngc({
      project: `${tmpFolder}/tsconfig.es5.json`
    })
    .then((exitCode) => {
      if (exitCode === 1) {
        // This error is caught in the 'compile' task by the runSequence method callback
        // so that when ngc fails to compile, the whole compile process stops running
        throw new Error('ngc compilation failed');
      }
    });
});

/**
 * 5. Run rollup inside the /build folder to generate our Flat ES module and place the
 *    generated file into the /dist folder
 */
gulp.task('rollup:fesm', function() {
  return gulp.src(`${buildFolder}/**/*.js`)
    // transform the files here.
    .pipe(rollup({

      // Bundle's entry point
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#entry
      entry: `${buildFolder}/index.js`,

      // Allow mixing of hypothetical and actual files. "Actual" files can be files
      // accessed by Rollup or produced by plugins further down the chain.
      // This prevents errors like: 'path/file' does not exist in the hypothetical file system
      // when subdirectories are used in the `src` directory.
      allowRealFiles: true,

      // A list of IDs of modules that should remain external to the bundle
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#external
      external: external,

      // Format of generated bundle
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#format
      format: 'es',

      onwarn: onwarn,
    }))
    .pipe(gulp.dest(distFolder));
});

/**
 * 6. Run rollup inside the /build folder to generate our UMD module and place the
 *    generated file into the /dist folder
 */
gulp.task('rollup:umd', function() {
  return gulp.src(`${buildFolder}/**/*.js`)
    // transform the files here.
    .pipe(rollup({

      // Bundle's entry point
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#entry
      entry: `${buildFolder}/index.js`,

      // Allow mixing of hypothetical and actual files. "Actual" files can be files
      // accessed by Rollup or produced by plugins further down the chain.
      // This prevents errors like: 'path/file' does not exist in the hypothetical file system
      // when subdirectories are used in the `src` directory.
      allowRealFiles: true,

      // A list of IDs of modules that should remain external to the bundle
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#external
      external: external,

      // Format of generated bundle
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#format
      format: 'umd',

      // Export mode to use
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#exports
      exports: 'named',

      // The name to use for the module for UMD/IIFE bundles
      // (required for bundles with exports)
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#modulename
      moduleName: '@ksf/alloy',

      // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals
      globals: Object.assign({
          typescript: 'ts'
        },
          // Suppress `o name was provided for external module '@angular/core' in options.globals – guessing '_angular_core'` message.
          // by converting externals to a map like {'@angular/core': '_angular_core'}
          Object.assign(...external.map(d => ({[d]: d.replace(/\W/g, '_')})))
      ),

      onwarn: onwarn,
    }))
    .pipe(rename('alloy.umd.js'))
    .pipe(gulp.dest(distFolder));
});

/**
 * 7. Compile CSS out of SCSS
 */
gulp.task('sass:build', function() {
  return gulp.src(`${tmpFolder}/scss/**/*.scss`)
    .pipe(sass({ errLogToConsole: true }).on('error', sass.logError))
    .pipe(gulp.dest(`${tmpFolder}/css`));
});

/**
 * 8. Minify CSS
 */
gulp.task('css:minify', function() {
  return gulp.src([`${tmpFolder}/css/*.css`, `!${tmpFolder}/css/*.min.css`])
    .pipe(cleanCSS({
      compatibility: 'ie9',
      debug: false,
      level: 2
    }, function(details) {
      gutil.log(
        ' '.repeat(9),
        gutil.colors.green(details.name),
        filesize(details.stats.originalSize),
        '->',
        filesize(details.stats.minifiedSize),
        '(' + (details.stats.efficiency).toFixed(2) * 100 + '%)'
        )
    }))
    .pipe(rename(function(path) {
      path.extname = ".min.css";
    }))
    .pipe(gulp.dest(`${tmpFolder}/css`));
});

/**
 * 9. Copy SCSS from /.tmp to /build directory
 */
gulp.task('copy:sass', function() {
  return gulp.src(`${tmpFolder}/scss/**/*`)
    .pipe(gulp.dest(`${buildFolder}/scss`));
});

/**
 * 10. Copy CSS from /.tmp to /build directory
 */
gulp.task('copy:css', function() {
  return gulp.src(`${tmpFolder}/css/*.css`)
    .pipe(gulp.dest(`${buildFolder}/css`));
});


/**
 * 11. Copy .npmignore from root to /dist directory
 */
gulp.task('copy:npmignore', function() {
  return gulp.src(`${rootFolder}/.npmignore`)
    .pipe(gulp.dest(`${distFolder}`));
});

/**
 * 12. Copy all the files from /build to /dist, except .js files. We ignore all .js from /build
 *    because with don't need individual modules anymore, just the Flat ES module generated
 *    on step 5.
 */
gulp.task('copy:build', function() {
  return gulp.src([`${buildFolder}/**/*`, `!${buildFolder}/**/*.js`])
    .pipe(gulp.dest(distFolder));
});

/**
 * 13. Copy package.json from /src to /dist
 */
gulp.task('copy:manifest', function() {
  return gulp.src([`${srcFolder}/package.json`])
    .pipe(gulp.dest(distFolder));
});

/**
 * 14. Copy README.md from / to /dist
 */
gulp.task('copy:readme', function() {
  return gulp.src([path.join(rootFolder, 'README.MD')])
    .pipe(gulp.dest(distFolder));
});

/**
 * 15. Delete /.tmp folder
 */
gulp.task('clean:tmp', function() {
  return deleteFolders([tmpFolder]);
});

/**
 * 16. Delete /build folder
 */
gulp.task('clean:build', function() {
  return deleteFolders([buildFolder]);
});

/**
 * 17. Update package.json
 */
gulp.task('update:manifest', function() {
  const packageRoot = require(`${rootFolder}/package.json`);
  let packageSrc = require(`${srcFolder}/package.json`)

  packageSrc.version = packageRoot.version;
  packageSrc.description =  packageRoot.description;
  packageSrc.keywords =  packageRoot.keywords;
  packageSrc.license =  packageRoot.license;
  packageSrc.author =  packageRoot.author;
  packageSrc.publishConfig =  packageRoot.publishConfig;

  // Making sure we update verison of actuall lib package.json
  fs.writeFile(`${srcFolder}/package.json`, JSON.stringify(packageSrc, null, 2) + '\n', 'utf8', (err) => {
    if (err) throw err;
  });

  return;
});


/**
 * Copy dependencies to build/node_modules/ by by
 * value in './package.json' file
 */
gulp.task('copy:dependencies:tmp', function() {
  return gulp
    .src(gnf(null, `${srcFolder}/package.json`), {base:'./'})
    .pipe(gulp.dest(tmpFolder));
});
gulp.task('copy:dependencies:dist', function() {
  return gulp
    .src(gnf(null, `${srcFolder}/package.json`), {base:'./'})
    .pipe(gulp.dest(distFolder));
});

gulp.task('compile', function() {
  runSequence(
    'sass:images',
    'clean:dist',
    'copy:source',
    'copy:dependencies:tmp',
    'sass:build',
    'css:minify',
    'copy:css',
    'inline-resources',
    'ngc',
    'rollup:fesm',
    'rollup:umd',
    'copy:sass',
    'copy:build',
    'copy:npmignore',
    'copy:dependencies:dist',
    'copy:manifest',
    'copy:readme',
    'clean:build',
    'clean:tmp',
    function(err) {
      if (err) {
        console.log('ERROR:', err.message);
        deleteFolders([distFolder, tmpFolder, buildFolder]);
      } else {
        console.log('Compilation finished succesfully');
      }
    });
});

/**
 * Watch for any change in the /src folder and compile files
 */
gulp.task('watch', function() {
  gulp.watch(`${srcFolder}/**/*`, ['compile']);
});

gulp.task('clean', ['clean:dist', 'clean:tmp', 'clean:build']);

gulp.task('build', ['clean', 'update:manifest', 'compile']);
gulp.task('build:watch', ['build', 'watch']);
gulp.task('default', ['build:watch']);

/**
 * Deletes the specified folder
 */
function deleteFolders(folders) {
  return del(folders);
}