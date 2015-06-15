var unid = require('../index.js');

var obj = {};
for (var i = 0; i < 10000; i++) {
  var id = unid.generate(i);
  console.log(id);
  if(obj[id] !== undefined)
    return console.log('Collision occur');
  obj[id] = '';
}

console.dir(obj);
