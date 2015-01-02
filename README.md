# grunt-nsgen

> Generate JS namespace based on file structure.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-nsgen --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nsgen');
```

## The "nsgen" task

### Overview
In your project's Gruntfile, add a section named `nsgen` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  nsgen: {
    your_target: {
      cwd: "src",
      src: "**/*.js",
      dest: "gen/target.js",
      namespace: "",
      output: "js" // optional: can be "js" (default) or "coffee"
    }
  },
});
```