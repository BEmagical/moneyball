module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    compass: {
      build: {
        options: {
          specify: ["public/wp-content/themes/ryu/assets/scss/style.scss"],
          outputStyle: "compressed",
          noLineComments: false,
          sassDir: "public/wp-content/themes/ryu/assets/scss",
          cssDir: "public/wp-content/themes/ryu" 
        }
      }
    },

    watch: {
      sass: {
        files: ["public/wp-content/themes/ryu/assets/scss/partials/*.scss"],
        tasks: ["compass:build"],
        options: {
          livereload: true,
          host: "moneyball:8888"
        }
      }
    },

    rsync: {
      options: {
        args: ["--verbose"],
        recursive: true,
        exclude: [".git*", "node_modules", "Gruntfile.js", "package.json", "wp-config.php"]
      },
      production: {
        options: {
          src: "./",
          dest: "/home/seattlek/public_html/",
          host: "seattlek@seattlekrakenNHL.com"
        }
      }
    }
  });

  grunt.registerTask("default", "Build tasks for production.", function() {
    grunt.task.run("compass:build", "watch:sass");
  });

  grunt.registerTask("production", "Deploy to production environment.", function() {
    grunt.task.run("rsync:production");
  });

  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
}