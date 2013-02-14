module.exports = function( grunt ) {
  'use strict';
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // Project configuration
    // ---------------------

    // Coffee to JS compilation
    coffee: {
      compile: {
        files: {
          'javascripts/*.js': 'javascripts/**/*.coffee'
        }
      }
    },

    // compile .scss/.sass to .css using Compass
    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        options: {
          css_dir: 'stylesheets',
          sass_dir: 'stylesheets',
          images_dir: 'images',
          javascripts_dir: 'javascripts',
          force: true
        }
      }
    },

    jekyll: {
      server: {
        src : '',
        dest: '_site',
        server : true,
        server_port : 3500,
        auto : true
      },
      dev: {
        src: '',
        desc: '_site',
        pygments: true,
        lsi: false,
        safe: true
      }
    },

    reload: {
      port: 3501,
      proxy: {
        port: 3500,
        host: 'localhost'
      }
    },

    // default watch configuration
    watch: {
//      coffee: {
//        files: [
//          'javascripts/**/*.coffee',
//          'test/spec/**/*.coffee'
//        ],
//        tasks: 'coffee reload'
//      },
      compass: {
        files: [
          'sass/**/*.{scss,sass}'
        ],
        tasks: 'compass reload-all'
      },
      reload: {
        files: [
          './*.{html,md,markdown}',
          './_layouts/*.{html,md,markdown}',
          './_includes/*.{html,md,markdown}',
          './_posts/*.{html,md,markdown}',
          'stylesheets/**/*.css',
          'javascripts/**/*.js',
          'images/**/*'
        ],
        tasks: 'reload-all'
      }
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',
    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'stylesheets/main.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'javascripts/**/*.js',
      css: 'stylesheets/**/*.css',
      img: 'images/**'
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    server: {
      port: 3500,
      base: './_site'
    }

  });

  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask("jekyll-server", "Run jekyll with --server and --auto", function() {
    require('child_process').exec('jekyll --auto --server 3500 --safe');
  });

  grunt.registerTask('reload-all', 'jekyll:dev reload');
  grunt.task.registerTask('default', 'jekyll:dev server reload watch');
};
