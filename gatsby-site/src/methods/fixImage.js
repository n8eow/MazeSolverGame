import inbounds from "../methods/inbounds.js";

var Jimp = require('jimp');

function fixImage(image, Start, End, crop){
  //console.log("FIXIMAGE", Start, End);
  for (var i = 0; i < image.bitmap.width; i++) {
    for (var j = 0; j < image.bitmap.height; j++) {
        var rgbVal = Jimp.intToRGBA(image.getPixelColor(i, j));
        if ((i == Start.X && j == Start.Y) || (i == End.X && j == End.Y)){
          for(var k = i - 4; k < i + 9; k++){
            for(var l = j - 4; l < j + 9; l++){
              if(inbounds(k, l, image.bitmap.width, image.bitmap.height)){
                if(i == Start.X){
                  image.setPixelColor(0xff0000ff, k, l);
                }else{
                  image.setPixelColor(0x00ff00ff, k, l);
                }
              }
            }
          }
        }
        else if ((i < crop.X || j < crop.Y || j > image.bitmap.height - crop.Y || i > image.bitmap.width - crop.X)
        && !(rgbVal.r == 255 && rgbVal.g == 0 && rgbVal.b == 0) &&
        !(rgbVal.r == 0 && rgbVal.g == 255 && rgbVal.b == 0)){
          image.setPixelColor(0x000000, i, j);
        }
        else if((rgbVal.r < 200 || rgbVal.b < 200 || rgbVal.g < 200) && !(rgbVal.r == 255 && rgbVal.g == 0 && rgbVal.b == 0) &&
                                    !(rgbVal.r == 0 && rgbVal.g == 255 && rgbVal.b == 0)){
          image.setPixelColor(0x000000, i, j);
        }
        else{
          if(!(rgbVal.r == 255 && rgbVal.g == 0 && rgbVal.b == 0) &&
             !(rgbVal.r == 0 && rgbVal.g == 255 && rgbVal.b == 0)){
            image.setPixelColor(0xffffffff, i, j);
          }
        }
    }
  }
  //console.log("0, 0", Jimp.intToRGBA(image.getPixelColor(0, 0)));
  return image;
}

export default fixImage;
