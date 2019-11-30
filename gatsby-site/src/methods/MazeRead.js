//var getPixels = require("get-pixels")
var Jimp = require('jimp')
//var PixelArray;
//var PixelArray = [];

function makeArray(d1, d2) {
  var arr = new Array(d1), i, l;
  for(i = 0, l = d2; i < l; i++) {
      arr[i] = new Array(d1);
  }
  console.log("MADE ARRAY", arr)
  return arr;
}

function readMaze(image){
  console.log("readmaze");
  var PixelArray = makeArray(image.bitmap.height, image.bitmap.width);
  for (var i = 0; i < image.bitmap.width; i++) {
    for (var j = 0; j < image.bitmap.height; j++) {
        var rgbVal = Jimp.intToRGBA(image.getPixelColor(i, j));

        if(rgbVal.r <= 50){
          PixelArray[i][j] = 1;
        }else{
          PixelArray[i][j] = 0;
        }
    }
  }
 return PixelArray;
}

export default readMaze;
