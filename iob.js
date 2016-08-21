var request = require('request')

function address (x, y) {
  var idx = 201 + (y * 10) + x
  return 'http://192.168.16.' + idx
}

function color (rgb) {
  return '?r='+rgb[0]+'&g='+rgb[1]+'&b='+rgb[2]
}

function set (x, y, rgb) {
  request(address(x, y) + color(rgb), function () {})
}

module.exports = set
