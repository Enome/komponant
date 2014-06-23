# Komponant 

Collection of plugins and custom plugins for gulp to build reusable components for react.js.

## Goals

- es6 modules.
- css3 variables for theming.
- suitcss conventions for sane css.
- flat dependencies (bower).
- easy to customize the build step at the project level.

## Pipeline

The gulp pipeline looks like [this](http://i.imgur.com/K7JzQjg.png) and like [this](https://github.com/Enome/komponant/blob/master/index.js#L111) in code.

## Usage

Check `index.js` and `Gulpfile-example.js`.

### Component

Create a bower.json file (`bower init`) add a main field with a path or an array of paths pointing to your files.

### Project

Create a bower.json file add dependencies to the dependencies field or install them with `bower install <name> --save`. For local files add a main field with a path or an array of paths pointing to your files.
