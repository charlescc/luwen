module.exports = function(grunt) {

	//配置项目
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: [
				'app/*.html',
				'app/style/{,*/}*.css',
				'app/scripts/{,*/}*.js',
				'app/images/{,*/}*.{png,jpg}'
				// '<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		watch:{
			livereload: {
				options: {
					livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
				},

				files: [ //下面文件的改变就会实时刷新网页
					'app/*.html',
					'app/style/*.css',
					'app/scripts/*.js',
					'app/images/*.{png,jpg}'
				]
			}
		},
		connect: {
			options: {
				
				hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
				livereload: 35729 //声明给 watch 监听的端口

			},
			server: {
				options: {
					port: 3000,
					open: true, //自动打开网页 http://
					base: [
						'app/' //主目录
					]
				}
			}    
		},
		
		mock2easy: {
	        dev:{
	            options: {
	                port:3001,
	                lazyLoadTime:3000,  
	                database:'database',
	                doc:'doc',   
	                
	                ignoreField:['__preventCache'],  
	                interfaceSuffix:'.json',
	                preferredLanguage:'en'  
	            }
	        }
	   }
	});
	//加载任务
	//grunt.loadNpmTasks();
	
	require('load-grunt-tasks')(grunt);
	//默认任务
	/*grunt.registerTask('slack_server','slack server',function(){
		var path=require('path');
		var action = require('./slack_server')(grunt,{
			port:9000,
			hostname:'localhost',
			base:[
				'app'
			]
		});
		//console.log(path.resolve('./slack_server.js'));
		//console.log(action);
		//action();

	});*/
	grunt.loadNpmTasks('grunt-mock2easy');
	grunt.registerTask('serve', [
		'connect:server',
		'mock2easy',
		'watch'
	]);
	
}