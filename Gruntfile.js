module.exports = function(grunt) {
    grunt.initConfig({
        coffee: {
          dist: {
            files: [{
              expand: true,
              cwd: 'lib',
              src: '**/*.{coffee,litcoffee,coffee.md}',
              dest: 'lib',
              ext: '.js'
            }]
          }
        },

        sass: {
          dist: {
            options: {
              sourcemap: 'none'
            },
            files: [{
              expand: true,
              src: ['lib/**/*.scss'],
              ext: '.css'
            }]
          }
        },

        watch: {
          sass: {
            files: ['lib/**/*.scss'],
            tasks: ['sass']
          },
          coffee: {
            files: ['lib/**/*.{coffee,litcoffee,coffee.md}'],
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
              csp: true,
              inline: true,
              strip: true
            },
            files: {
              'dist/index.html': 'demo.html'
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['watch']);
};
