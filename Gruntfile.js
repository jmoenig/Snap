module.exports = function(grunt) {
  var fs = require('fs');
  var path = require('path');
  var rimraf = require('rimraf');
  
  /**
   * This function gets all script sources from HTML tags in exactly the following format: <script type="text/javascript" src="?"></script>
   */
  function getScripts(htmlFilename) {
      var htmlFile = fs.readFileSync(htmlFilename);
	  var scriptsArray = [];
	  //Now we find all the javascript elements and minify them all into one
	  var regex = /<script type="text\/javascript" src="(.*?)"><\/script>/g;
	  var result;
	  while ((result = regex.exec(htmlFile)) !== null)
	  {
	    scriptsArray.push(result[1]);
      }
	  return scriptsArray;
  }
  
  function copyFile(src, dst) {
	fs.createReadStream(src).pipe(fs.createWriteStream(dst));
  }
  
  //To avoid tonnes of repetition, this creates the configuration object that creates a zip of a program.
  //It simply sets the zip output name to 'build/xxx.zip' and includes all files from the base + 'xxx.html', 'xxx_logo_sm.png' and (if usesExtraJs) 'js/xxx.min.js'
  function makeCompressObject(name, usesExtraJs)
  {
    var inputArray = ['help/*.png', 'scriptsPaneTexture.gif', 'click.wav', 'js/base.min.js', name + '.html', name + '_logo_sm.png'];
	if (usesExtraJs)
	{
		inputArray.push('js/' + name + '.min.js');
	}
	return {
		options: {
		  archive: 'build/'+name+'.zip'
		},
		files: [
		  {
		  expand: true, 
		  cwd: 'build/html',
		  src: inputArray
		  },
		]
	  }
  }

  //The base file is scribble. All scripts you find in scribble are used in the files in htmlFiles
  baseFile = 'scribble.html';
  
  //These files require some additional scripts to work
  htmlFiles = ['cellular.html', 'ardrone.html'];
  
  var baseScripts = getScripts(baseFile);
  
  //fileObject format: {
  // 'uglified js output goes here' : ['made up', 'from these', 'js files']
  //}
  var filesObject = {'build/html/js/base.min.js': baseScripts}
  
  //This gets the extra scripts required for all the files in htmlFiles
  htmlFiles.forEach(function(htmlFilename) {
	  var scripts = getScripts(htmlFilename);
	  
	  //Remove the scripts that are present in both this HTML file and the base js file
	  baseScripts.forEach(function(v) {
		var i = scripts.indexOf(v);
		if (i >= 0)
		{
			scripts.splice(i, 1);
		}
		else
		{
			console.log("File in base html not in child html!");
			throw new Error();
		}
	  })
	  
	  //Save these in the output files object.
	  var extension = path.extname(htmlFilename)
	  var outFile = 'build/html/js/' + htmlFilename.substring(0, htmlFilename.length - extension.length) + ".min.js";
	  filesObject[outFile] = scripts;
  });
  
  //Configure:
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
	  'all': {
		  options: {
		  },
		  files: filesObject,
		}
    },
	copy: {
	  'all': {
	    files: [{
		  expand: true, 
		  cwd: 'help-mini',
		  src: '*.png',
		  dest: 'build/html/help/'
		},
	    {
		  expand: true, 
		  cwd: 'html-mini',
		  src: '*.html',
		  dest: 'build/html/'
		}]
	  }
	},
	compress: {
	 'all': {
		options: {
		  archive: 'build/all.zip'
		},
		files: [
		  {
		  expand: true, 
		  cwd: 'build/html',
		  src: '**'
		  },
		]
	  },
	 'cellular': makeCompressObject('cellular', true),
	 'scribble': makeCompressObject('scribble', false),
	 'ardrone': makeCompressObject('ardrone', true),
	 'ardrone-server': {
		options: {
		  archive: 'build/ardrone-server.zip'
		},
		files: [
		  {
		  expand: true, 
		  cwd: 'ardrone/',
		  src: 'AR-drone Server Package/**'
		  },
		]
	  },
	}
  });
  
  //Copy all the logo files into the output directory
  grunt.registerTask('copyLogos', 'Copy files', function() {
	copyFiles = [
		'scriptsPaneTexture.gif',
		'cellular_logo_sm.png',
		'scribble_logo_sm.png',
		'ardrone_logo_sm.png',
		'click.wav',
	];
	copyFiles.forEach(function(value) {
		var log = grunt.log.write('Copying file ' + value + '... ');
		copyFile(value, 'build/html/' + value);
		log.ok();
	});
  });
  
  //Removes and re-creates the build directory
  grunt.registerTask('clean', 'Clean build', function() {
	rimraf.sync('build');
	fs.mkdirSync('build');
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'copy', 'copyLogos', 'compress']);
};