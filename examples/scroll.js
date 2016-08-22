var set = require('../iob')

function makeWorld (old) {
  var w = new Array(5).fill(0).map(function () {
    return new Array(10).fill([0, 0, 0])
  })
  for (var i=0; i < 10; i++) {
    for (var j=0; j < 5; j++) {
      w[j][i] = old ? old[j][i] : [0, 0, 0]
    }
  }
  return w
}


var world = makeWorld()

var letters = {
  ' ': [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ],
  'A': [
    1, 1, 1,
    1, 0, 1,
    1, 1, 1,
    1, 0, 1,
    1, 0, 1
  ],
  'I': [
    1, 1, 1,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    1, 1, 1
  ],
  'B': [
    1, 1, 0,
    1, 0, 1,
    1, 1, 1,
    1, 0, 1,
    1, 1, 0
  ],
  'C': [
    1, 1, 1,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 1, 1
  ],
  'K': [
    1, 0, 1,
    1, 1, 0,
    1, 0, 0,
    1, 1, 0,
    1, 0, 1
  ],
  'T': [
    1, 1, 1,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0
  ],
  'H': [
    1, 0, 1,
    1, 0, 1,
    1, 1, 1,
    1, 0, 1,
    1, 0, 1
  ],
  'E': [
    1, 1, 1,
    1, 0, 0,
    1, 1, 0,
    1, 0, 0,
    1, 1, 1
  ],
  'P': [
    1, 1, 1,
    1, 0, 1,
    1, 1, 0,
    1, 0, 0,
    1, 0, 0
  ],
  'L': [
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 1, 1
  ],
  'N': [
    1, 0, 1,
    1, 1, 1,
    1, 1, 1,
    1, 0, 1,
    1, 0, 1
  ],
  'N': [
    1, 0, 1,
    1, 1, 1,
    1, 1, 1,
    1, 0, 1,
    1, 0, 1
  ],
}

function letter (world, letter, x, rgb) {
  var next = makeWorld(world)
  var data = letters[letter]
  for (var i=x; i < x+3; i++) {
    for (var j=0; j < 5; j++) {
      var xx = (i-x) % 10
      var col = data[xx + j*3]
      next[j][i] = col ? rgb : [0, 0, 0]
      // console.log(i, j, col, next[j][i])
    }
  }
  return next
}

function render (world) {
  for (var i=0; i < 10; i++) {
    for (var j=0; j < 5; j++) {
      set(i, j, world[j][i])
    }
  }
}

function renderSync (world, cb) {
  var n = 50
  for (var i=0; i < 10; i++) {
    for (var j=0; j < 5; j++) {
      set(i, j, world[j][i], function () {
        n--
        if (n <= 0 && cb) return cb()
      })
    }
  }
}

function string (world, txt, offset, rgb) {
  return txt.split('').reduce(function (w, l) {
    var res = letter(w, l, offset, rgb)
    offset += 4
    return res
  }, world)
}

var x = 8
function step (world) {
  x -= 0.5
  var offset = Math.floor(x)
  var intensity = ((Math.sin(new Date().getTime() / 500) + 1) / 2) * 8 + 32
  return string(makeWorld(), 'HACK THE PLANET', offset, [intensity, 0, 0])
  // world = letter(world, 'H', x, [8, 0, 0])
  // world = letter(world, 'I', x+4, [8, 0, 0])
  return world
}

function frame () {
  world = makeWorld()
  world = step(world)
  renderSync(world, frame)
}

frame()

// var world = 
