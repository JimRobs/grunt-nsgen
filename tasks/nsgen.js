/*
 * grunt-ns-gen
 * https://github.com/jimrobs/grunt-ns-gen
 *
 * Copyright (c) 2015 jimrobs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var JS_TEMPLATE = grunt.file.read(__dirname+"/../templates/js.template");
    var COFFEE_TEMPLATE = grunt.file.read(__dirname+"/../templates/coffee.template");

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('nsgen', 'Generate JS namespace based on file structure.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            output: 'js',
            style: 'package'
        });

        var style = options.style;
        if(!style || style !== 'package' && style !== 'filepath') {
            return grunt.fatal('The style option must be "package" or "filepath"');
        }

        // Iterate over all specified file groups.
        this.files.forEach(function (group) {
            var namespace = group.namespace || group.ns;

            var output = group.output || options.output;
            if(!output || output !== 'js' && output !== 'coffee') {
                return grunt.fatal('The output option must be "js" or "coffee"');
            }

            if(!namespace) {
                return grunt.fatal('The namespace property must be defined.');
            }

            var hierarchy = {};

            var cwd = group.cwd || "";
            var dest = group.dest;

            group.src.forEach(function(file){
                if(!grunt.file.isFile(cwd, file)) {
                    return;
                }

                var parts = file.split('/').map(function(part){
                    return part.replace(/\.[^/.]+$/, '');
                });

                var lastIndex = parts.length - 1;
                (function(hierarchy){
                    parts.forEach(function(part, index){
                        if(index === lastIndex){
                            hierarchy[part] = style = 'package' ? parts.join(".") : file;
                        } else{
                            if(!hierarchy[part]){
                                hierarchy[part] = {};
                            }
                            hierarchy = hierarchy[part];
                        }
                    });
                })(hierarchy);
            });

            var content = output === 'js' ? JS_TEMPLATE : COFFEE_TEMPLATE;
            content = content.replace('{namespace}', namespace);
            content = content.replace('{hierarchy}', JSON.stringify(hierarchy));

            if(!dest){
                console.log(content);
            } else {
                grunt.file.write(dest, content);
            }
        });
    });
};


