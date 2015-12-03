var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true,
          livereload: false
        }
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          ignore: [
            'node_modules/**'
          ],
          ext: 'js'
        }
      }
    },
		watch: {
      serverJS: {
        options: {
          livereload: false
        },
        files: ['*.js'],
        tasks: ['newer:jshint:server']
      }
    },
    jshint: {
      server: {
        options: {
          jshintrc: '.jshintrc-server'
        },
        src: [
          'controllers/**/*.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['concurrent']);
  grunt.registerTask('run', ['concurrent']); 
  grunt.registerTask('build', ['uglify']);
};
