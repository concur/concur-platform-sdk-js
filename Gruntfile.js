module.exports = function(grunt){
  // helper to automatically call grunt.loadNpmTasks('foo') for all package.json dependencies matching the pattern grunt-*
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // plugin configuration details here
    jshint: {
      all: {
        options: {
          expr: true
        },
        src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
      }
    },
    env: {
      dev: {
        APPLICATION_NAME: 'node-utils',
        NODE_ENV: 'test'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          ui: 'bdd',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false // Optionally suppress output to standard out (defaults to false)
        },
        src: ['test/*.js']
      },
      'ci-shippable': {
        options: {
          reporter: 'xunit',
          captureFile: 'shippable/testresults/result.xml' // Optionally capture the reporter output to a file
        },
        src: ['test/*.js']
      }
    }
  });

  // register tasks
  grunt.registerTask('default', ['npm-install', 'jshint', 'env:dev', 'mochaTest:test']);
  grunt.registerTask('ci-shippable', ['jshint', 'env:dev', 'mochaTest:ci-shippable']);
};
