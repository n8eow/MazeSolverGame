import fixImage from "../methods/fixImage";
import readMaze from "../methods/readMaze";
import makeArray from "../methods/makeArray";
import ValidMove from "../methods/ValidMove";
import changeStart from "../methods/ModStartObj";
import AddPath from "../methods/AddPath.js";
import SlideLocation from "../methods/SlideLocation.js"

var Jimp = require('jimp');
var SimpleHashTable = require('simple-hashtable');

function reportPath(curr, Table, Start){
  var path = new Array();
  console.log("curr1", curr, Table.get(curr), Table.get(Table.get(curr)));
  while (curr != -1){
    if((curr.X == Start.X) && (curr.Y == Start.Y)){
      return path;
    }
    path.push(curr);
    curr = Table.get(curr);
  }
  return [];
}

function BFSolve(visited, PixelArray, Start, End){
  var Q = new Array();
  Q.unshift(Start);

  var Curr;
  var Table = new SimpleHashTable()
  var Moves = ["U", "D", "L", "R"];
  var iterations = 0;
  while (Q.length != 0){
    iterations += 1;
    Curr = Q.pop();
    if (Curr.X == End.X && Curr.Y == End.Y){
      console.log("FINISHED");
      return reportPath(Curr, Table, Start);
    }
    if (iterations > 300000){
      console.log("too many iterations");
      return [];
    }
      for (var move of Moves){
        if(ValidMove(move, Curr, PixelArray, visited)){
          if(iterations%500 == 0){
            console.log("PUSH ONTO Q", changeStart(Curr, move));
          }

          var NewSpot = changeStart(Curr, move);
          Q.unshift(NewSpot);
          visited[NewSpot.X][NewSpot.Y] = 1;
          Table.put(NewSpot, Curr);
        }
      }
    }
    console.log("QUE EMPTY")
    return [];
  }





function SolveMaze(image, PixelArray, Start, End){
  var visited = makeArray(image.bitmap.height, image.bitmap.width)
  for (var i = 0; i < image.bitmap.width; i++) {
    for (var j = 0; j < image.bitmap.height; j++) {
      visited[i][j] = 0;
    }
  }
  return BFSolve(visited, PixelArray, Start, End);
}

/*
  READ IMAGE
*/

async function mainSolver(filename, Start, End, crop, solve){

  console.log("FILENAME", filename);
  var image = await Jimp.read(filename);
  image = image.scaleToFit(350, 350);
  image = fixImage(image, Start, End, crop);
  var PixelArray = readMaze(image);
  var imageResult;
  if (solve == true){
    var path = SolveMaze(image, PixelArray, Start, End);
    if (path == []){
    }else{
      image = await AddPath(path, image);
    }
  }

  var ModImage = await image.clone()
  var NewImage = SlideLocation(ModImage, Start, End)
  imageResult = await NewImage.getBase64Async(NewImage.getMIME());
  return [imageResult, image];
}

export default mainSolver;
