Angular Demo App For Alloy
=======

### Purpose of this project
1. Be an example of how Alloy library for angular can be consumed
2. Provide help by being a fron-end layer for Alloy library development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

### Installation

1. Install dependencies
```bash
$ npm install
```
2. Make sure you have either Alloy library build, for more information see root lavel `README.md` section **Development**:
2.1 Make sure `dist` root folder is linked
```bash
$ cd ./dist && npm link
```
2.2 Make sure Alloy is linked in this project
```bash
$ npm link @ksf/alloy
```
3. Run the project
```bash
npm start
```
After you run the command the project will be built and ran in `production` mode (`--aot --prod`) with changes detection in both it's own and Alloy source code.
The reason it runs in production is to test `AOT` compiler which is cranky for `import/export/providers` statements.
It's better to test `AOT` by default to catch compilation error earlier.