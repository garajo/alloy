Alloy (KSF GUI HTML5 Component and Styling Library)
===========

This module contains all commonly used KSF GUI HTML5 components with the official CARANU styling. Styling is pure HTML &
CSS without any behavior to the components. (No Javascript). CSS styling is based on the SCSS (Sassy CSS) syntax
and the *.scss style sheets are compiled to *.css files using the node-sass npm module. In addition to pure CSS,
Foundation for Sites is used as the starting point for the styling. Also, included are few examples demonstrating
the usage of the components or styles (alone) in individual applications. Initial release of the Alloy library targets
only the styling of various HTML5 elements as per the Caranu guidelines and does not include any reusable HTML5 components
as a whole. Future releases would add new components to the library.

## Installation

To install this library, run:

```bash
$ npm install @ksf/alloy --save
```

## Example Apps
    - `./examples/html-layout-app` - Pure HTML example
    - `./examples/angular-layout-app` - Angular based example


## Consuming library

You can import your library in any Angular application by running:

```bash
$ npm install @ksf/alloy
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AlloyModule } from '@ksf/alloy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```
