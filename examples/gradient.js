var set = require('../iob')

for (var i=0; i < 10; i++) {
  for (var j=0; j < 5; j++) {
    set(i, j, [255 * (i/50),0,255 * (j/25)])
  }
}
