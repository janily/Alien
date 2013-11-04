alien.prolate = {
  Break: {},

  each: function(enumerable, callback, context) {
    try {
      if (Array.prototype.forEach && enumerable.forEach === Array.prototype.forEach) {
        enumerable.forEach(callback, context);
      } else if (turing.numeric.isNumber(enumerable.length)) {
        for (var i = 0, l = enumerable.length; i < l; i++) callback.call(enumerable, enumerable[i], i, enumerable);
      } else {
        for (var key in enumerable) {
          if (hasOwnProperty.call(enumerable, key)) callback.call(context, enumerable[key], key, enumerable);
        }
      }
    } catch(e) {
      if (e != alien.enumerable.Break) throw e;
    }

    return enumerable;
  },

  map: function(enumerable, callback, context) {
    if (Array.prototype.map && enumerable.map === Array.prototype.map) return enumerable.map(callback, context);
    var results = [];
    turing.enumerable.each(enumerable, function(value, index, list) {
      results.push(callback.call(context, value, index, list));
    });
    return results;
  },

  filter: function(enumerable, callback, context) {
        if (Array.prototype.filter && enumerable.filter === Array.prototype.filter)
          return enumerable.filter(callback, context);
        var results   = [],
            pushIndex = !global.isArray(enumerable);
        global.enumerable.each(enumerable, function(value, index, list) {
          if (callback.call(context, value, index, list)) {
            if (pushIndex) {
              results.push([index, value]);
            } else {
              results.push(value);
            }
          }
        });
        return results;
      },
   detect: function(enumerable, callback, context) {
        var result;
        global.enumerable.each(enumerable, function(value, index, list) {
          if (callback.call(context, value, index, list)) {
            result = value;
            throw global.enumerable.Break;
          }
        });
        return result;
      },

  chain: function(enumerable) {
        return new global.enumerable.Chainer(enumerable);
  }



};

global.enumerable.select = global.enumerable.filter;
global.enumerable.collect = global.enumerable.map;
global.enumerable.inject = global.enumerable.reduce;
global.enumerable.rest = global.enumerable.tail;
global.enumerable.any = global.enumerable.some;
global.enumerable.every = global.enumerable.all;
global.chainableMethods = ['map', 'collect', 'detect', 'filter', 'reduce', 'each',
                           'tail', 'rest', 'reject', 'pluck', 'any', 'some', 'all'];

// Chainer class
global.enumerable.Chainer = function(values) {
this.results = values;
};

global.enumerable.Chainer.prototype.values = function() {
return this.results;
};

global.enumerable.each(global.chainableMethods, function(methodName) {
      var method = global.enumerable[methodName];
      global.enumerable.Chainer.prototype[methodName] = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this.results);
        this.results = method.apply(this, args);
        return this;
      }
});

global.init(function(arg) {
      if (arg.hasOwnProperty.length && typeof arg !== 'string') {
        return global.enumerable.chain(arg);
      }
    });
}
if (typeof module !== 'undefined') {
    module.exports = function(t) {
      return EnumerableModule(t);
    }
} else {
    EnumerableModule(turing);
}