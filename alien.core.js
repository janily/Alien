(function(global) {
  var alien = {
    VERSION: '0.0.1',
    lesson: 'Part 1: Library Architecture'
  };

  if (global.alien) {
    throw new Error('alien has already been defined');
  } else {
    global.alien = alien;
  }
})(typeof window === 'undefined' ? this : window);