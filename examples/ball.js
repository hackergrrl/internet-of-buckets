var set = require('../iob')

function makeWorld () {
  return new Array(5).fill(0).map(function () {
    return new Array(10).fill(0)
  })
}

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

var x = 5
var y = 2.5
var ang = Math.random() * 2 * 3.14159
ang = 3.14159 / 4
var xv = Math.cos(ang) * 0.25
var yv = Math.sin(ang) * 0.25

function step (world) {
  x += xv
  y += yv
  if (x >= 8) xv *= -1
  if (x <= 0) xv *= -1
  if (y >= 4) yv *= -1
  if (y <= 0) yv *= -1
  return applyLight(world, x, y, 0.1, [16, 0, 0])
}

function frame () {
  world = step(world)
  renderSync(world, frame)
}

frame()

// var world = 
