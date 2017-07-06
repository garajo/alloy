Alloy
===========

##### KSF GUI HTML5 Component and Styling Library

This library contains commonly used KSF GUI HTML5 components with the official [Caranu styling](https://confluence.it.keysight.com/display/guiGuild/Visual+Style+Guide+-+Both+Schemes+-+Updated?preview=/39592284/39592281/Keysight-Style_Guide2.pdf).
The logic implemented as an Angular library.


This library is based on [generator-angular2-library](https://github.com/jvandemo/generator-angular2-library), aligns with the [official Angular Package Format v4.0](https://goo.gl/AMOU5G) and automatically generates a `Flat ES Module`, a `UMD bundle`, a single `metadata.json` and type definitions to make your library ready for AOT compilation by the consuming Angular application.

Watch [Jason Aden's talk](https://www.youtube.com/watch?v=unICbsPGFIA) to learn more about the [Angular Package Format]((https://goo.gl/AMOU5G)).

## Installation and Consuming the library

You can install Alloy library by running:

```bash
$ npm install @ksf/alloy --save
```

### Using CSS styling only

```
./node_modules/@ksf/alloy/css/alloy.css
```
or
```
./node_modules/@ksf/alloy/css/alloy.min.css

```

### Using Alloy as an Angular library

Import Alloy Modules into your `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Importing Alloy modules
import { AlloyDropdownModule, AlloyInputModule } from '@ksf/alloy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlloyDropdownModule,
    AlloyInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Example Apps
    - `./examples/html-layout-app` - Pure HTML example
    - `./examples/angular-layout-app` - Angular based example


## Development and Releasing

1. Make changes to files in source folder `./src`
2. Lint all the files:
```bash
$ npm run lint
```

3. Generate the library distribution directory including all `*.js`, `*.d.ts` and `*.metadata.json` files:
```bash
$ npm run build
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
