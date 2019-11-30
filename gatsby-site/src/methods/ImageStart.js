import readMaze from "../methods/MazeRead.js";

var Jimp = require('jimp');

function inbounds(i,j, height, width){
  if (i > width || i < 0 || j > height || j < 0){
    return false;
  }
  return true;
}

function fixImage(image, Start, End){
  console.log("FIXIMAGE", Start, End)
  for (var i = 0; i < image.bitmap.width; i++) {
    for (var j = 0; j < image.bitmap.height; j++) {
        var rgbVal = Jimp.intToRGBA(image.getPixelColor(i, j));
        if ((i == Start.X && j == Start.Y) || (i == End.X && j == End.Y)){
          /*indices = [[[i + 1],[j]], [[i + 3],[j]], [[i+3],[j]], [[i-1],[j]], [[i - 2],[j]], [[i-3],[j]],
                   [[[i],[j + 1]], [[i],[j + 2]], [[i],[j+3]], [[i],[j-1]], [[i],[j - 2]], [[i-3][j]]
          */
          for(var k = i - 4; k < 9; k++){
            for(var l = j - 4; l < 9; l++){
              if(inbounds(k, l, image.bitmap.width, image.bitmap.height)){
                image.setPixelColor(0x00ff00, k, l);
                console.log("START END PIX COLOR", Jimp.intToRGBA(image.getPixelColor(k, l)));
              }

            }
          }
        }
        else if((rgbVal.r < 150) && !(rgbVal.r == 0 && rgbVal.g == 0 && rgbVal.b == 255)){
          image.setPixelColor(0x000000, i, j);
        }
        else{
          image.setPixelColor(0xffffff, i, j);
        }
    }
  }
  return image;
}

/*
  READ IMAGE
*/
async function readImage(filename, Start, End){

  console.log("START", Start);
  console.log("END", End);
  var image = await Jimp.read(filename);
  image = fixImage(image, Start, End);
  var PixelArray = readMaze(image);
  //var SolvedMaze = SolveMaze(image, PixelArray);
  //var imageResult = await SolvedMaze.getBase64Async(SolvedMaze.getMIME());
  var imageResult = await image.getBase64Async(image.getMIME());
  console.log("IMAGE RESULT", imageResult);
  return imageResult;
}

export default readImage;
