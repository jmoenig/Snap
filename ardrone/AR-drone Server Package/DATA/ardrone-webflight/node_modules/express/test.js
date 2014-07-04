
/**
 * Module dependencies.
 */

var express = require('./')
  , app = express()

app.get('/:type/size::size', ['test'], function(req, res){
  console.log(req.params.type);
  console.log(req.params.size);
});

app.listen(3000);
console.log('listening on 3000');
