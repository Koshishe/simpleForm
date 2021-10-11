# Simple workflow
Project workflow using [webpack 4](https://webpack.js.org/).

## Getting started
Install packages with npm:
```bash
npm install
```
Or with yarn:
```bash
yarn
```
## Scripts
For development using [webpack-dev-server](https://webpack.js.org/configuration/dev-server/):
```bash
npm run dev
```
Build for production:
```bash
npm run build
```
Get a full fake REST API with data from `data/json-server.json` file using [json-server](https://github.com/typicode/json-server):
```bash
npm run json-server
```
## Directory Structure
### cache
Used by [imagemin-webpack-plugin](https://github.com/Klathmon/imagemin-webpack-plugin) to cache already minified images. On next run plugin will check for the cached images first. If cached image exists it will simply use that one. Otherwise image will be optimised and written to the folder for later builds.
### static
Compiled files after the build script.
### src
All source files except packages imported from node_modules. This is the directory you should work in. In the root of this folder you can find webpack entry point file `index.js` and pages list template `index.ejs`.
#### data
All `.json` files that can be included with [nunjucks-includeData](https://www.npmjs.com/package/nunjucks-includeData) as data in all templates.
#### fonts
Project fonts.
#### img
Project images. All images are minified during build script by [imagemin-webpack-plugin](https://github.com/Klathmon/imagemin-webpack-plugin).
#### js
Script files split into directories:
##### modules
Your custom script files typically imported into `app.js`.
##### utils
Handy js utilities and functions.
#### scss
Style files split into directories:
##### base
Global scss config.
#### static
Files that should be put into the server root (`/static/robots.txt` is accessible under `http://localhost:8081/robots.txt`).
#### templates
[Nunjucks](https://mozilla.github.io/nunjucks/) templates in `.twig` extension for better IDE support, split into directories:
##### layouts
Page layouts.
##### pages
Pages templates. You create new pages by creating files in this folder. Pages list is available under <http://localhost:8081> while running dev script or `index.html` in the `dist` folder after running build script. 

## Additional features
#### Babel 7
Babel is used as a JavaScript compiler. Config: `.babelrc`.
#### Eslint
Used for linting `.js` and `.vue` files except `node_modules` and `vendor` directories. Config: `.eslintrc.js`.
#### Stylelint
Used for linting `.scss` and `.vue` files. Config: `.stylelintrc`.
#### Postcss
CSS gets [autoprefixed](https://github.com/postcss/autoprefixer) and compressed with [cssnano](https://cssnano.co/). Config: `postcss.config.js`.
