var Jimp = require('jimp');

async function GetDimens(filename){
  var image = await Jimp.read(filename);
  //image.resize(250, Jimp.AUTO);
  image.quality(1);
  var Dimens = {height : image.bitmap.height, width : image.bitmap.width};
  return Dimens;
}

export default GetDimens;
