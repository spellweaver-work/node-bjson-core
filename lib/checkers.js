// Generated by IcedCoffeeScript 1.7.1-b
(function() {
  var E, check_array, checkers, intval;

  E = function(s) {
    return new Error(s);
  };

  exports.checkers = checkers = {};

  checkers.array = check_array = function(_arg) {
    var checker, max, min;
    min = _arg.min, max = _arg.max, checker = _arg.checker;
    return function(x) {
      var el, err, i, _i, _len;
      if (typeof x !== 'object' || !Array.isArray(x)) {
        return E("expected an array");
      } else if ((min != null) && x.length < min) {
        return E("Array must have >= " + min + " elements");
      } else if ((max != null) && x.length > max) {
        return E("Array must have <= " + max + " elements");
      } else if (checker != null) {
        err = null;
        for (i = _i = 0, _len = x.length; _i < _len; i = ++_i) {
          el = x[i];
          if ((err = checker(el, i)) != null) {
            break;
          }
        }
        return err;
      } else {
        return null;
      }
    };
  };

  checkers.buffer = function(min, max) {
    if (min == null) {
      min = null;
    }
    if (max == null) {
      max = null;
    }
    return function(x) {
      if (typeof x !== 'object' || !Buffer.isBuffer(x)) {
        return E("expected a buffer");
      } else if ((min != null) && x.length < min) {
        return E("Buffer must have >= " + min + " bytes");
      } else if ((max != null) && x.length > max) {
        return E("Buffer must have <= " + max + " bytes");
      } else {
        return null;
      }
    };
  };

  checkers.string = function(min, max) {
    if (min == null) {
      min = null;
    }
    if (max == null) {
      max = null;
    }
    return function(x) {
      if (typeof x !== 'string') {
        return E("expected a string");
      } else if ((min != null) && x.length < min) {
        return E("String must have >= " + min + " chars");
      } else if ((max != null) && x.length > max) {
        return E("String must have <= " + max + " chars");
      } else {
        return null;
      }
    };
  };

  checkers.intval = intval = function(min, max) {
    if (min == null) {
      min = null;
    }
    if (max == null) {
      max = null;
    }
    return function(x) {
      if (typeof x !== 'number') {
        return E("expected a number");
      } else if ((min != null) && x < min) {
        return E("Value must be >= " + min);
      } else if ((max != null) && x > max) {
        return E("Value must be <= " + max);
      } else {
        return null;
      }
    };
  };

  checkers.nnint = intval(0);

  checkers.pint = intval(1);

  checkers.value = function(v) {
    return function(x) {
      var a, b;
      if ((a = typeof v) !== (b = typeof x)) {
        return E("Type mismatch: " + a + " != " + b);
      } else if (v !== x) {
        return E("Value mismatch: " + v + " != " + x);
      } else {
        return null;
      }
    };
  };

  checkers.type = function(a) {
    return function(x) {
      var b;
      b = typeof x;
      if (a !== b) {
        return E("Type mismatch: wanted " + a + " but got " + b);
      } else {
        return null;
      }
    };
  };

  checkers.non_null = function() {
    return function(x) {
      if (x == null) {
        return E("Got a null value when a non-null value was needed");
      } else {
        return null;
      }
    };
  };

  checkers.sparse_array = function(template) {
    return function(arr) {
      var err, k, v;
      err = check_array()(arr);
      if (err == null) {
        for (k in template) {
          v = template[k];
          err = k < arr.length ? v(arr[k]) : new Error("Array too short: len < " + x.length);
          if (err != null) {
            break;
          }
        }
      }
      return err;
    };
  };

}).call(this);
