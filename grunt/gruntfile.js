module.exports = function(grunt) {

	var path = {
		scss_sp: "../scss/sp/",
		scss_pc: "../scss/pc/",
		css_sp: "../css/sp/",
		css_pc: "../css/pc/",
		js_sp: "../js/sp/",
		js_pc: "../js/pc/"
	};

	var files = {
		destinations_sp: {
			css:  path.css_sp + "all_sp.min.css",
			javascript: path.js_sp + "all_sp.min.js"
		},
		intermediates_sp: {
			css: path.css_sp + "all_sp.css",
			javascript: path.js_sp + "all_sp.js"
		},
		destinations_pc: {
			css:  path.css_pc + "all_pc.min.css",
			javascript: path.js_pc + "all_pc.min.js"
		},
		intermediates_pc: {
			css: path.css_pc + "all_pc.css",
			javascript: path.js_pc + "all_pc.js"
		},
		sources : {
			scss_sp: [
				path.scss_sp + "reset.scss",
				path.scss_sp + "base.scss",
				path.scss_sp + "style.scss",
				path.scss_sp + "helper.scss"
			],
			scss_pc: [
				path.scss_pc + "reset.scss",
				path.scss_pc + "base.scss",
				path.scss_pc + "style.scss",
				path.scss_pc + "helper.scss"
			],
			css_sp: [
				path.css_sp + "reset.css",
				path.css_sp + "base.css",
				path.css_sp + "style.css",
				path.css_sp + "helper.css"
			],
			css_pc: [
				path.css_pc + "reset.css",
				path.css_pc + "base.css",
				path.css_pc + "style.css",
				path.css_pc + "helper.css"
			],
			js_sp: [
				path.js_sp + "medtech1.js",
				path.js_sp + "medtech2.js"
			],
			js_pc: [
				path.js_pc + "medtech1.js",
				path.js_pc + "medtech2.js"
			]
		}
	};

  	grunt.initConfig({
    		// compass
    		compass: {
	      		dist: {
	        		options: {
	            			config: "config.rb"
				}
	      		}
		},
		// concat
		concat: {
			css: {
				files: [
					{ src: files.sources.css_sp, dest: files.intermediates_sp.css },
					{ src: files.sources.css_pc, dest: files.intermediates_pc.css }
				]
			},
			js: {
				files: [
					{ src: files.sources.js_sp, dest: files.intermediates_sp.javascript },
					{ src: files.sources.js_pc, dest: files.intermediates_pc.javascript }
				]
			}
		},
		// cssmin
		cssmin: {
			sp: {
				files:  { src: files.intermediates_sp.css, dest: files.destinations_sp.css }
			},
			pc: {
				files: { src: files.intermediates_pc.css, dest: files.destinations_pc.css }
			}
		},
		// uglify
		uglify: {
			sp: {
				files: [{ src: files.intermediates_sp.javascript, dest: files.destinations_sp.javascript }]
			},
			pc: {
				files: [{ src: files.intermediates_pc.javascript, dest: files.destinations_pc.javascript }]
			}
		},
            	// watch
            	watch: {
            		scss_sp: {
            			files: [ files.sources.scss_sp ],
            			tasks: [ 'buildcss' ],
            		},
            		scss_pc: {
            			files: [ files.sources.scss_pc ],
            			tasks: [ 'buildcss' ],
            		},
            		js_sp: {
            			files: [ files.sources.js_sp ],
            			tasks: [ 'buildjs' ],
            		},
            		js_pc: {
            			files: [ files.sources.js_pc ],
            			tasks: [ 'buildjs' ],
            		}
            	}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// main task
  	grunt.registerTask('default', [ 'watch' ]);
	grunt.registerTask('buildcss', [ 'compass', 'concat', 'cssmin' ]);
	grunt.registerTask('buildjs', [ 'concat', 'uglify' ]);
};