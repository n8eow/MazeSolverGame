var Jimp = require('jimp');

async function GetDimens(filename){
  var image = await Jimp.read(filename);
  image = image.scaleToFit(350, 350);
  var Dimens = {height : image.bitmap.height, width : image.bitmap.width};
  return Dimens;
}

export default GetDimens;
