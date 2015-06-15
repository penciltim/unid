var Base62 = require('Base62');

module.exports = (function (unid) {
  function roundFunction(input) {
    return ((1369 * input + 150889) % 714025) / 714025.0;
  }

  function PermuteId(id) {
    var l1 = (id >>> 16) & 65535;
    var r1 = id & 65535;
    var l2, r2;
    for (var i = 0; i < 2; i++) {
      l2 = r1;
      r2 = l1 ^ (roundFunction(r1) * 65535);
      l1 = l2;
      r1 = r2;
    }
    return ((r1 << 16 >>> 0) + l1);
  }

  unid.generate = function (id) {
    return Base62.encode(PermuteId(id));
  };

  return unid;
})({});
