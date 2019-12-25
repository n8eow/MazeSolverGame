import inbounds from "../methods/inbounds.js";
import SlideLocation from "../methods/SlideLocation.js"

var Jimp = require('jimp');

function fixImage(image, Start, End, crop){
  //console.log("FIXIMAGE", Start, End);
  for (var i = 0; i < image.bitmap.width; i++) {
    for (var j = 0; j < image.bitmap.height; j++) {
        var rgbVal = Jimp.intToRGBA(image.getPixelColor(i, j));
      if (!(rgbVal.r == 255 && rgbVal.g == 0 && rgbVal.b == 0) &&
        !(rgbVal.r == 0 && rgbVal.g == 255 && rgbVal.b == 0)){
        if ((i < crop.X || j < crop.Y || j > image.bitmap.height - crop.Y || i > image.bitmap.width - crop.X)){
          image.setPixelColor(0x000000, i, j);
        }
        else if((rgbVal.r < 150 && rgbVal.b < 150 ) ||  (rgbVal.r < 150 && rgbVal.g < 150) ||
        (rgbVal.b < 150 && rgbVal.g < 150)){
          image.setPixelColor(0x000000, i, j);
        }
        else{
            image.setPixelColor(0xffffffff, i, j);
        }
      }
    }
  }
  //image = SlideLocation(image, Start, End);

  //console.log("0, 0", Jimp.intToRGBA(image.getPixelColor(0, 0)));
  return image;
}

export default fixImage;
