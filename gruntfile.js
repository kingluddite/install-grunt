module.exports = function( grunt ) {
  const defaults = {
    html: 'index.html',
    sass: {
      all: 'src/sass/**/*.scss',
      main: 'src/sass/style.scss',
    },
    js: [
      'src/js/data.js',
      'src/js/helpers.js',
      'src/js/model.js',
      'src/js/router.js',
      'src/js/view.js',
      'src/js/editor.js',
      'src/js/app.js'
    ],
    destinations: 'dist/js/bundle.js'
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON( 'package.json' ),

    sass: {
      dist: {
        files: {
          'dist/css/style.css': defaults.sass.main
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [defaults.js],
        dest: defaults.destinations
        //dest: 'dist/js/bundle.js'
      },
    },

    uglify: {
      // what files do you want me to minify?
      dist: {
        files: {
          //'dist/js/bundle.min.js': '<%= concat.dist.dest %>'
          'dist/js/bundle.min.js': defaults.destinations
        }
      }
    },

    jshint: {
      files: ['gruntfile.js', [defaults.js]],
      options: {
        globals: {
          console: true,
          module: true
        },
        esversion: 6
      }
    },

    watch {
      files: [ defaults.html, defaults.sass.all, defaults.js ],
      tasks: ['jshint', 'concat', 'uglify', 'sass']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};