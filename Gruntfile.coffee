module.exports = (grunt) ->

    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-concat'

    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        concat:
            dist:
                dest: 'build/<%= pkg.name %>.coffee'
                src: [
                    'lib/canned-vas.coffee'
                    'lib/canned-vas.core.coffee'
                    'lib/canned-vas.util.coffee'
                    'lib/canned-vas.shapes.coffee'
                    'lib/canned-vas.graphics.coffee'
                    'lib/canned-vas.image-data.coffee'
                    'lib/canned-vas.text.coffee'
                ]

        coffee:
            glob_to_multiple:
                expand: true
                flatten: true
                src: 'build/*.coffee'
                dest: 'dist/'
                ext: '.js'

    grunt.registerTask 'build', ['concat', 'coffee']
