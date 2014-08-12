module.exports = function(grunt) {
    // Init grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        /**
        * Watch files for changes
        **/
        watch: {
            coffee: {
                files: ["src/*.coffee"],
                tasks: ["coffee", "uglify:js"],
                options: {
                    livereload: true
                }
            },
            livereload: {
                files: "example/index.html",
                options: {
                    livereload: true
                }
            }
        },
        coffee: {
            compile: {
                files: {
                    "dist/windowscroll.js": "src/windowscroll.coffee"
                }
            }
        },
        uglify: {
            js: {
                options: {
                    banner: "/*\n" + grunt.file.read("LICENSE") + "*/\n"
                },
                files: {
                    "dist/windowscroll.min.js": ["dist/windowscroll.js"]
                }
            }
        }
    });

    // Load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Grunt tasks
    grunt.registerTask("default", ["watch"]);
};
