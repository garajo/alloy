Angular Demo App For Alloy
=======

### Purpose of this project
1. Demonstrate the usage of all the GUI components added to the Alloy library in an Angular application.
2. Presents all the features/ behaviors of each of these components in an interactive way.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

### Running the demo quickly in one step

To quickly run the demo use the command: 
```bash
$ npm run demo
```

### Running the demo following the instructions step-by-step

1. Install dependencies. Make sure you have installed all the dependencies at the root level before this step [$ npm install at root]
```bash
$ npm install
```
2. Make sure you have Alloy library build before this step. [$ npm run build at root]
For more information see root lavel `README.md` section **Development**:

2.1 Make sure `dist` root folder is linked
```bash
$ cd ./dist && npm link
```
2.2 Make sure Alloy is linked in this project
```bash
$ npm link @keysight/alloy
```
3. Run the project
```bash
npm start
```

After you run the command the project will be built and ran in `production` mode (`--aot --prod`) with changes detection in both it's own and Alloy source code.
The reason it runs in production is to test `AOT` compiler which is cranky for `import/export/providers` statements.
It's better to test `AOT` by default to catch compilation error earlier.