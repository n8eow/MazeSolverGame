import makeArray from "../methods/makeArray.js";

var Jimp = require('jimp');

export function readMaze(image){
  //console.log("readmaze");
  var PixelArray = makeArray(image.bitmap.height, image.bitmap.width);
  for (var i = 0; i < image.bitmap.width; i++) {
    for (var j = 0; j < image.bitmap.height; j++) {
        var rgbVal = Jimp.intToRGBA(image.getPixelColor(i, j));

        if(rgbVal.r <= 50 && rgbVal.g <= 200){
          PixelArray[i][j] = 0;
        }else{
          PixelArray[i][j] = 1;
        }
    }
  }
 return PixelArray;
}

export default readMaze;
