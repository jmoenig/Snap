<a name="start"></a>

Node BufferedReader
===================

_Node.js project_

#### Binary and event-based data buffered readers ####

[Show me!](#showme) | [Availability](#availability) | [Compatibility](#compatibility) | [Documentation](#documentation)

Version: 1.0.1

When you need to read a file you typically read a chunk of bytes called "buffer" to avoid multiple calls to the underlying I/O layer, so instead of reading directly from the disk, you read from the previous filled buffer. Doing this you win performance.

This library allows you to read files without worry about the buffers. There are two ways to read the files. The first can only read binary data and has a pointer to move along the file (seek, skip, read). The second performs a read from the beginning to the end of the file and emits different events (byte, character, line, buffer...).

<a name="showme"></a>
#### Show me! [↑](#start) ####

```javascript
var reader = require ("buffered-reader");
var BinaryReader = reader.BinaryReader;
var DataReader = reader.DataReader;

var close = function (binaryReader, error){
	if (error) console.log (error);
	
	binaryReader.close (function (error){
		if (error) console.log (error);
	});
};

var file = "file";
var offset;

new DataReader (file, { encoding: "utf8" })
		.on ("error", function (error){
			console.log (error);
		})
		.on ("line", function (line, nextByteOffset){
			if (line === "Phasellus ultrices ligula sed odio ultricies egestas."){
				offset = nextByteOffset;
				this.interrupt ();
			}
		})
		.on ("end", function (){
			new BinaryReader (file)
					.seek (offset, function (error){
						if (error) return close (this, error);
						
						this.read (9, function (error, bytes, bytesRead){
							if (error) return close (this, error);
							
							console.log (bytes.toString ()); //Prints: Curabitur
							
							close (this);
						});
					});
		})
		.read ();
```

file:

```text
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Morbi convallis nibh massa, eu varius felis.

Phasellus ultrices ligula sed odio ultricies egestas.
Curabitur pretium magna in diam accumsan dignissim.
Phasellus et tortor eu orci suscipit vehicula.
Phasellus pulvinar mauris in purus consequat vel congue orci hendrerit.
Pellentesque eget arcu magna, suscipit imperdiet eros.
```

***

<a name="availability"></a>
#### Availability [↑](#start) ####

Via npm:

```
npm install buffered-reader
```

***

<a name="compatibility"></a>
#### Compatibility [↑](#start) ####

✔ Node *

***

<a name="documentation"></a>
#### Documentation [↑](#start) ####
 
[Reference](https://github.com/Gagle/Node-BufferedReader/wiki/Reference)  
[Examples](https://github.com/Gagle/Node-BufferedReader/tree/master/examples)  
[Change Log](https://github.com/Gagle/Node-BufferedReader/wiki/Change-Log)  
[MIT License](https://github.com/Gagle/Node-BufferedReader/blob/master/LICENSE)