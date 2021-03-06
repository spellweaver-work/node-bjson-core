// Generated by IcedCoffeeScript 1.7.1-b
(function() {
  var C, decode, decode_json, decode_json_obj, decode_msgpack, purepack;

  purepack = require('purepack');

  C = require('./const').C;

  exports.decode = decode = function(_arg) {
    var buf, encoding;
    buf = _arg.buf, encoding = _arg.encoding;
    encoding || (encoding = 'json');
    if (encoding === 'json') {
      return decode_json(buf);
    } else if (encoding === 'msgpack' || encoding === 'msgpack64') {
      return decode_msgpack({
        buf: buf,
        encoding: encoding
      });
    } else {
      return [new Error("unknown encoding type: " + encoding), null];
    }
  };

  exports.self_describing_decode = function(_arg) {
    var buf, encoding, err, obj, _ref;
    buf = _arg.buf;
    obj = null;
    err = buf.length < 3 ? new Error("Need buffer >= 3 bytes long") : buf[0] !== C.version.V1 ? new Error("Can only handle V1") : (encoding = C.encodings.lookup[buf[1]]) == null ? new Error("Unknown encoding type: " + buf[1]) : ((_ref = decode({
      buf: buf.slice(2),
      encoding: encoding
    }), err = _ref[0], obj = _ref[1], _ref), err);
    return [err, obj];
  };

  decode_msgpack = function(_arg) {
    var buf, e, encoding, err, ret, s;
    buf = _arg.buf, encoding = _arg.encoding;
    err = ret = null;
    if (encoding === 'msgpack64') {
      s = Buffer.isBuffer(buf) ? buf.toString('utf8') : buf;
      buf = new Buffer(s, 'base64');
      if (buf.length === 0) {
        err = new Error("Bad-base64 encoding");
      }
    }
    if (err == null) {
      try {
        ret = purepack.unpack(buf);
      } catch (_error) {
        e = _error;
        err = e;
      }
    }
    return [err, ret];
  };

  exports.decode_json_obj = decode_json_obj = function(o) {
    var b, e, k, out, v, _i, _len, _results, _to_buffer;
    _to_buffer = function(o) {
      var b;
      if (Object.keys(o).length !== 1) {
        return null;
      } else if ((b = o.__b) != null) {
        return new Buffer(b, 'base64');
      } else if ((b = o.__h) != null) {
        return new Buffer(b, 'hex');
      } else {
        return null;
      }
    };
    if (typeof o !== 'object') {
      return o;
    } else if (Array.isArray(o)) {
      _results = [];
      for (_i = 0, _len = o.length; _i < _len; _i++) {
        e = o[_i];
        _results.push(decode_json_obj(e));
      }
      return _results;
    } else if ((b = _to_buffer(o))) {
      return b;
    } else {
      out = {};
      for (k in o) {
        v = o[k];
        out[k] = decode_json_obj(v);
      }
      return out;
    }
  };

  decode_json = function(buf) {
    var e, err, obj, ret;
    err = ret = null;
    try {
      obj = JSON.parse(buf);
    } catch (_error) {
      e = _error;
      err = new Error("Error parsing JSON: " + e.message);
    }
    if (err == null) {
      ret = decode_json_obj(obj);
    }
    return [err, ret];
  };

}).call(this);
