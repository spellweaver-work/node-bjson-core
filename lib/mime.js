// Generated by IcedCoffeeScript 1.7.1-b
(function() {
  var k, mime_types, v;

  exports.mime_types = mime_types = {
    json: "application/json",
    msgpack: "application/x-msgpack",
    msgpack64: "application/x-msgpack-64"
  };

  exports.accept = (function() {
    var _results;
    _results = [];
    for (k in mime_types) {
      v = mime_types[k];
      _results.push(k);
    }
    return _results;
  })();

}).call(this);