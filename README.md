# How to create a Wallboardr plugin

This repository is a template for creating plugins for new screen types in Wallboardr.

## General repository files

None of the files in this section are strictly necessary, but are useful to add metadata to describe what you've done.

* `README.md` - always good to have a file describing your screen type for others.
* `package.json` - npm-style package file to describe the screen with version number, links etc.

## Admin app files

These are files which are used to render the admin tool which is used to create and edit your screen via the administrators of the system. This is an area where I will try to streamline more and more in the future.

* `add.html` - 
* `display.html` - 
* `edit.html` - 
* `admin.js` -
* `admin.less` - 

## Screen display files

* `screen.mustache` - This the template file for the screen that will display on the wallboard itself when shown. It will be handed view data (of your creation) and can do the usual mustache things, except partials as only this one file is loaded.

* `screen.less` - LESS stylesheet for any extra rendering of your screen. This file is optional, if present, will be compiled with the `variables.less` file. Loads after the default style of the screens, so can override anything if necessary.

### `screen.js`

This JavaScript will be included via require.js and therefore needs to be an AMD module. There are some modules which are available

