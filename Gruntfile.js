/*
 * grunt-ns-gen
 * https://github.com/jimrobs/grunt-ns-gen
 *
 * Copyright (c) 2015 jimrobs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            results : 'test/results'
        },

        // Configuration to be run (and then tested).
        nsgen: {
            js: {
                namespace: "js_namespace",
                cwd: "test/fixtures/js",
                src: [
                    "**/*.js",
                    "!**/*.off.js"
                ],
                dest: 'test/results/js_namespace.js'
            },
            coffee: {
                output: 'coffee',
                namespace: "coffee_namespace",
                cwd: "test/fixtures/coffee",
                src: [
                    "**/*.coffee",
                    "!**/*.off.coffee"
                ],
                dest: 'test/results/coffee_namespace.coffee'
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'nsgen']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
