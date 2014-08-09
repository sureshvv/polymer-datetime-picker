module.exports = function(grunt) {
    grunt.initConfig({
        compass: {
            options: {
                config: "config.rb"
            },
            dist: {
                files: [{
                    expand: true,
                    src: ['{,*/}*.scss'],
                    ext: '.css'
                }]
            }
        },

        coffee: {
          dist: {
            files: [{
              expand: true,
              src: '{,*/}*.{coffee,litcoffee,coffee.md}',
              ext: '.js'
            }]
         }
        },

        // qunit: {
        //     all: ['test/runner.html']
        // },

        watch: {
          compass: {
            files: ['{,*/}*.scss'],
            tasks: ['compass']
          },
          coffee: {
              files: ['{,*/}*.{coffee,litcoffee,coffee.md}'],
              tasks: ['coffee:dist']
          }
        },

        connect: {
          demo: {
            options: {
              keepalive: true
            }
          },
          server: {
            options: {
              port: 9001,
              base: './'
            }
          }
        },

        vulcanize: {
          default: {
            options: {
              inline: true
            },
            files: {
              'index.html': 'demo2.html'
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    // grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['watch']);
};
