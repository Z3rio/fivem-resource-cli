![Logo](https://raw.githubusercontent.com/Z3rio/fivem-resource-cli/main/logo.png)

# FiveM Resource CLI

This is a FiveM resource CLI made to make it easier for people to create their own resources.<br>
You can pick any of the popular fivem frameworks and ui frameworks and the CLI will setup a boilerplate resource for you.<br>
[**NPM Package Link**](https://www.npmjs.com/package/fivem-resource-cli)

# Installation

Run `npm install -g fivem-resource-cli` in a console window.

# Usage

To use this CLI, run `fivemresource new` in any command window.<br>
If you are going to use any UI framework such as VUE, go into the recently created resource folder and then open the command line in the `src` folder and run `npm install`.<br>
Then you can use vue / react etc as normal building using `npm run build` and such.

## Requirements

- [Node.js](https://nodejs.org/en/)
- A FiveM server if you actually want to use the files generated from this CLI.

## Technologies used

- [fs](https://www.npmjs.com/package/fs) & [fs-extra](https://www.npmjs.com/package/fs-extra) for filesystem handling
- [inquirer](https://www.npmjs.com/package/inquirer) for prompt / input handling
- All UI frameworks use [Vite](https://vitejs.dev/) for building

<br>

# FiveM Boilerplate types

- Standalone / No framework
- [QB-Core](https://github.com/qbcore-framework)
- [ESX](https://github.com/esx-framework/esx-legacy)

# UI Boilerplate types

(All boilerplates have a JS & TS version)

- No UI
- No framework
- [Vue 3.0](https://vuejs.org/)
- [Vue 2.0 / CDN](https://v2.vuejs.org/)
- [JQuery](https://jquery.com/)
- [React](https://reactjs.org/)
