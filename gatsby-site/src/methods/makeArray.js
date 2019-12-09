var Jimp = require('jimp');
//var PixelArray;
//var PixelArray = [];

export function makeArray(d1, d2) {
  var arr = new Array(d1), i, l;
  for(i = 0, l = d2; i < l; i++) {
      arr[i] = new Array(d1);
  }
  //console.log("MADE ARRAY", arr)
  return arr;
}

export default makeArray;


