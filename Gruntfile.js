/**
 * Created by Ellery1 on 15/8/11.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        requirejs: {
            index: {
                options: {
                    baseUrl: './public',
                    mainConfigFile: './public/scripts/app.js',
                    include: ['/scripts/app.js'],
                    out: "./public/dest/app.js"
                }
            }
        },
        watch: {
            babel: {
                files: ['public/es6/**/*.js'],
                tasks: ['babel']
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015','react']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/es6/',
                    src: ['**/*.js'],
                    dest: 'public/scripts/',
                    ext: '.js'
                }]
            }
        }
    });

    grunt.registerTask('default', ['watch']);
};