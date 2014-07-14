module.exports = function (grunt) {
    'use strict';
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'lib/{,*/}*.js',
                'dist/nodecopter-stream.js'
            ]
        },

        uglify: {
            dist: {
                files: {
                    'dist/broadway.js' : [
                        'dist/vendor/broadway/glUtils.js',
                        'dist/vendor/broadway/util.js',
                        'dist/vendor/broadway/avc.js',
                        'dist/vendor/broadway/canvas.js',
                        'dist/nodecopter-stream.js'
                    ]
                }
            }
        },
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                src: [
                    'dist/vendor/broadway/sylvester.js',
                    'dist/vendor/broadway/avc-codec.js',
                    'dist/broadway.js'
                ],
                dest: 'dist/nodecopter-client.js'
            }
        }
    });
    grunt.registerTask('default', ['jshint', 'uglify', 'concat']);
};
