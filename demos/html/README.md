Alloy Pure HTML Example (KSF GUI HTML5 Component and Styling Library)
===========

### Purpose of this project
1. Demonstrate the structuring and Caranu styles for almost all the commonly used GUI controls.
2. Shows a way to include stylesheets in different ways in an application as CSS or SCSS.

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
$ npm link @ksf/alloy
```
3. Run the project
```bash
npm start
```