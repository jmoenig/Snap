var fs         = require('fs');
var loremIpsum = require('lorem-ipsum')

var gigabit     = (1000 * 1000 * 1000) / 8;
var bufferSize  = 64 * 1024;

var filename = process.argv[2];
fs.writeFileSync(filename, new Buffer(0));

var fileOffset = 0;
while (fileOffset < gigabit) {
  var bufferOffset = 0;
  var buffer = (gigabit - fileOffset < bufferSize)
    ? new Buffer(gigabit - fileOffset)
    : new Buffer(bufferSize);

  while (bufferOffset < buffer.length) {
    var stringLength = Math.floor(Math.random() * 256);
    if (stringLength + 1 > buffer.length - bufferOffset) {
      stringLength = buffer.length - bufferOffset - 1;
    }

    var string = loremIpsum({
      count: 50,
      units: 'words',
      paragraphPrefix: '',
      paragraphSuffix: '',
    }).substr(0, stringLength);

    buffer[bufferOffset++] = stringLength;
    buffer.write(string, bufferOffset);
    bufferOffset += stringLength;
  }

  fs.appendFileSync(filename, buffer);
  fileOffset += buffer.length;

  process.stdout.write('\rCreating ' + filename + ' (' + (fileOffset * 100 / gigabit).toFixed(2) + ' %)');
}

process.stdout.write('\n');
