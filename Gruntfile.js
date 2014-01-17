module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    compass: {
      build: {
        options: {
          specify: ["wp-content/themes/ryu/assets/scss/style.scss"],
          outputStyle: "compressed",
          noLineComments: false,
          sassDir: "wp-content/themes/ryu/assets/scss",
          cssDir: "wp-content/themes/ryu",     
        },
      },
    },

    watch: {
      sass: {
        files: ["wp-content/themes/ryu/assets/scss/partials/*.scss"],
        tasks: ["compass:build"],
      },
      livereload: {
        options: {livereload: true},
        files: ['wp-content/themes/ryu/style.css']
      },
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
        },
      },
    }
  });

  grunt.registerTask("default", "Build tasks for production.", function() {
    grunt.task.run("compass:build", "watch:sass", "watch:livereload");
  });

  grunt.registerTask("production", "Deploy to production environment.", function() {
    grunt.task.run("rsync:production");
  });

  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
}