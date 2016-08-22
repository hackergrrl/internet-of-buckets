var set = require('../iob')

// set(0, 0, [255, 0, 255])

function makeWorld () {
  return new Array(5).fill(0).map(function () {
    return new Array(10).fill(0)
  })
}

function rand () {
  return Math.floor(Math.random() * 255)
}

var c1 = [rand(), rand(), rand()]
var c2 = [rand(), rand(), rand()]

var world = makeWorld()

function applyLight (world, x, y, radius, rgb) {
  var next = makeWorld()
  for (var i=0; i < 10; i++) {
    for (var j=0; j < 5; j++) {
      var dx = x - i
      var dy = y - j
      var dist = Math.sqrt(dx*dx + dy*dy) + 0.001
      var power = radius / (dist*dist)
      power = Math.max(0, Math.min(1, power))
      // console.log(i, j, power)
      next[j][i] = [100 * power, 0, 0]
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

function step (world) {
  var t = new Date().getTime()
  var x = 5 + Math.sin(t/1000) * 2
  var y = 2 + Math.cos(t/285) * 1.5
  x = 5
  y = 2
  var r = 1 + Math.sin(t/500)
  return applyLight(world, x, y, r, [255, 0, 0])
}

function frame () {
  world = step(world)
  renderSync(world, frame)
}

frame()

// var world = 
