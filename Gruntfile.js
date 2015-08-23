module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
          dist: {
            options: {
              style: 'compressed'
            },
            files: {
              //'style.css': 'style.scss'
            }
          }
        },

        uglify: {
          options: {
            mangle: true,
            compress: true,
            quoteStyle: 1 // Enforce single quotation marks
          },
          target: {
            files: {
              // 'path/to/destination.min.js': ['list/of/files.js', 'another/js/file.js']
            }
          }
        },

        imagemin: {
          dynamic: {
            files: [
              {
                expand: true,
                cwd: //'img/src/',
                src: ['**/*.{png,jpg,gif}'],
                dest: //'img/dist/'
              }
            ]
          }
        },

        // Requires SVGO
        svgmin: {
          options: {
            plugins: [
              { collapseGroups: false }
            ]
          },
          dist: {
            files: [
              {
                expand: true,
                cwd: //'img/src',
                src: ['*.svg'],
                dest: //'img/dist',
                ext: '.min.svg'
              }
            ]
          }
        },

        // Requires gzip
        compress: {
          main: {
            options: {
              mode: 'gzip'
            },
            files: [
              {
                expand: true,
                cwd: //'img/dist',
                src: ['*.svg'],
                dest: //'img/dist',
                ext: '.svgz'
              }
            ]
          }
        },

        watch: {
          css: {
            files: '**/*.scss',
            tasks: ['sass']
          }
        }
      });

    grunt.task.registerTask('default', [
      'sass',
      'optimages',
      'uglify'
    ]);

    grunt.task.registerTask('optimages', [
      'imagemin',
      'svgmin',
      'compress'
    ]);
};
