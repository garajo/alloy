Alloy
===========

##### KSF GUI HTML5 Component and Styling Library

---
[Issues Tracker](https://jira.it.keysight.com/projects/ALLOY) | [Confluence Page](https://confluence.it.keysight.com/display/KsfGui/About+Alloy) | [Caranu Style Guide](https://confluence.it.keysight.com/display/guiGuild/Visual+Style+Guide+-+Both+Schemes+-+Updated)

---

This library contains commonly used KSF GUI HTML5 components with the official [Caranu styling](https://confluence.it.keysight.com/display/guiGuild/Visual+Style+Guide+-+Both+Schemes+-+Updated?preview=/39592284/39592281/Keysight-Style_Guide2.pdf).
The logic implemented as an Angular library.


This library is based on [generator-angular2-library](https://github.com/jvandemo/generator-angular2-library) which aligns with the [official Angular Package Format v4.0](https://goo.gl/AMOU5G) and automatically generates a `Flat ES Module`, a `UMD bundle`, a single `metadata.json` and type definitions to make your library ready for AOT compilation by the consuming Angular application.

Watch [Jason Aden's talk](https://www.youtube.com/watch?v=unICbsPGFIA) to learn more about the [Angular Package Format](https://goo.gl/AMOU5G).

## Implementation status
List of components and implementation states with comments:

| Name              | dir          | docs                                                                                       | Comments                                  |
| ---------------   | ------------ | ----------------------------------------------------------------------------------         | ----------------------------------------- |
| dropdown          | [src/dropdown](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/dropdown)         | [README.md](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/dropdown/README.md) | Major functionality implemented|
| checkbox          | [src/checkbox](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/checkbox)         | [README.md](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/checkbox/README.md) | Major functionality implemented|
| notification icon | [src/notification-icon](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/notification-icon)| [README.md](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/notification-icon/README.md) | Major functionality implemented|
| about box         | [src/about-box](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/about-box)        | [README.md](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/about-box/README.md) | Major functionality implemented|
| text area         | [src/textarea](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/textarea)         | [README.md](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/textarea/README.md) | Major functionality implemented|
| text box          | [src/textbox](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/textbox)          | [README.md](https://bitbucket.it.keysight.com/projects/KSFGUI/repos/alloy/browse/src/textbox/README.md) | Major functionality implemented|


## Installation and Consuming the library

You can install Alloy library by running:

```bash
$ npm install @keysight/alloy --save
```

### Using Alloy as an Angular library

1. Import Alloy Modules into your `AppModule`:
    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { AppComponent } from './app.component';

    // Importing Alloy modules
    import {
        AlloyDropdownModule
    } from '@keysight/alloy';

    /*
     * NgModule which includes all Alloy modules that are required to serve the demo app.
     * This approach allows to perform tree shaking.
     */
    @NgModule({
        exports: [
            AlloyDropdownModule
        ]
    })
    export class AlloyModule { }

    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            AlloyModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
2. import Alloy style (including fonts). There are two ways
2.1 By using SASS `@import` in your project's `src/styles.scss`:
    ```scss
    // Setting Alloy's fonts path so webpack underneath angular-cli can resolve and copy font files over
    $alloy-font-path: '~@keysight/alloy/fonts';

    // Importing Alloy styles
    @import '~@keysight/alloy/scss/alloy.scss';
    ```
2.2 By importing styles in `.angular-cli.json`. Based on your project set up either `alloy.css`, `alloy.min.css` or `alloy.scss` can be used.
    ```json
    {
      "apps": [
        {
          "styles": [
            "../node_modules/@keysight/alloy/css/alloy.css",
            "styles.css"
          ]
        }
      ]
    }
    ```

## Demo Apps
- `./demos/html` - Pure HTML demo app
- `./demos/angular` - Angular demo app


## Development
1. Install dependencies
```bash
$ npm install
```
2. Generate the library distribution directory including all `*.js`, `*.d.ts` and `*.metadata.json` files:
```bash
$ npm run build
```
2.1 For continuous development you can run build task in a watch mode for changes detection and re-building
```bash
$ npm run build:watch
```

3. Link `dist` folder
```bash
$ cd ./dist && npm link
```

4. Set up and run Angular Demo App
4.1 Open a new terminal window and navigate to the demo app (so you can run both library and the demo app in the `watch` mode)
```bash
$ cd ./demos/angular
```
4.2 Install dependencies
```bash
$ npm install
```
4.3 Link Alloy library
```bash
$ npm link @keysight/alloy
```
4.3 Run the app (runs in the `watch` mode with changes detection the source code)
```bash
$ npm start
```

5. Now you can make changes to the library and observe them in the angular demo app

## Publishing
1. Make sure all the files are linted:
```bash
$ npm run lint
```

4. Publish library to Artifactory NPM by publishing the contents of the `dist` directory:
```bash
$ npm publish dist
```

## Generating documentation

Docs generation:
```bash
$ npm run docs:build
```

This will generate a `docs` directory with all documentation of your library.

To serve your documentation, run:

```bash
$ npm run docs:serve
```

and navigate your browser to `http://localhost:8080`.

To automatically rebuild your documentation every time a file in the `src` directory changes, run:

```bash
$ npm run docs:watch
```
