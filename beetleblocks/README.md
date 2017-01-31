# Beetleblocks

*A 3D world for moving a 'beetle' in 3D space using Snap blocks,
positioning 3D shapes and tracing extrusions, and exporting
the resulting geometry from 3D printing*


## Coordinate system remapping

Note that the 'internal' axis names used by three.js functions
are different from the 'external' axis names used by beetleblocks
functions and their corresponding block labels. The 'forward' axis
is the direction along which the beetle moves forward

* red  	internal Z	beetleblocks X	(forward)
* green	internal X	beetleblocks Y
* blue	internal Y 	beetleblocks Z

also note that rotations around X and Z are inverted

## Known issues

### OBJ export not working yet... this is a research topic 

the problem with OBJ export is that it uses geometry data, not meshes
the geometries are not offset relative to each other- all are at the origin
maybe it's possible to manually offset them here?
also the current OBJExporter does not handle colors
do we also need to generate an mtl file to represent the different colors?

```
OBJButton.onclick = function () {
	var exporter = new THREE.OBJExporter();
	
	var numObjects = myObjects.length;
	console.log('exporting ' + numObjects + ' objects');

	var objString = '';	
	for (int i=0; i<numObjects; i++) {
		var geom = myObjects.children[i].geometry; 
		objString += exporter.parse(geom);
	}		
	
	var blob = new Blob([objString], {type: 'text/plain;charset=utf-8'});
	saveAs(blob, 'myObjects.obj'); // maybe at least add a datetime string for unique filenames?
};
```
