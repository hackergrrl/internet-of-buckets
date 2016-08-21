var set = require('./iob')

for (var i=0; i < 10; i++) {
  for (var j=0; j < 5; j++) {
    set(i, j, [255 * (i/50),0,255 * (j/25)])
  }
}
return


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

for (var i=0; i < 10; i++) {
  for (var j=0; j < 5; j++) {
    world[j][i] = Math.random() > 0.8
  }
}

function render (world) {
  for (var i=0; i < 10; i++) {
    for (var j=0; j < 5; j++) {
      set(i, j, world[j][i] ? c1 : c2)
    }
  }
}

function neighbours (world, x, y) {
  var n = 0
  for (var i=-1; i <= 1; i++) {
    for (var j=-1; j <= 1; j++) {
      if (i !== 0 && j !== 0) continue
      var xx = x + i
      var yy = y + j
      xx = Math.abs(xx) % 10
      yy = Math.abs(yy) % 5
      n += world[yy][xx] ? 1 : 0
    }
  }
  return n
}

function step (world) {
  var next = makeWorld()
  for (var i=0; i < 10; i++) {
    for (var j=0; j < 5; j++) {
      var n = neighbours(world, i, j)
      next[j][i] = (n === 2 || n === 3)
    }
  }
  return next
}

setInterval(function () {
  render(world)
  world = step(world)
}, 500)

// var world = 
