import fixImage from "../methods/fixImage";
import readMaze from "../methods/readMaze";
import makeArray from "../methods/makeArray";
import computeDirectionPriority from "../methods/DirectionPriority.js";
import ValidMove from "../methods/ValidMove";
import changeStart from "../methods/ModStartObj";
import AddPath from "../methods/AddPath.js";
import Addvisited from "../methods/AddVisited.js"
import PathInsert from "../methods/PathInsert.js";


var Jimp = require('jimp');

/* SOLVE THE MAZE */
function SolveRec(path, visited, PixelArray, Start, End){
  ////console.log("VISITED HEIGHT WIDTH", visited);
  console.log("START END RECURSIVE", Start.X, Start.Y, End.X, End.Y);
  ////console.log("path start", path);
  visited[Start.X][Start.Y] = 1;
  var Direction = [false, path];
  if(Start.X == End.X && Start.Y == End.Y){
    //console.log("FOUND PATH");
    return [true, path];
  }else{
    var Moves = computeDirectionPriority(Start, End);
    for(var move of Moves){
      //console.log("MOVING", Start.X, Start.Y, move);
      if(ValidMove(move, Start, PixelArray, visited)){
        Direction = SolveRec(PathInsert(path, Start), visited, PixelArray, changeStart(Start, move), End);
        if (Direction[0] == true){
          return Direction;
        }else{
          //console.log("DIRECTION", move, "DOESNT WORK from", Start.X, Start.Y, "continue");
        }
      }
    }
    //console.log("NOT FOUND");
    return [false, visited];
  }
}

function SolveMaze(image, PixelArray, Start, End){
  var visited = makeArray(image.bitmap.height, image.bitmap.width)
  for (var i = 0; i < image.bitmap.width; i++) {
    for (var j = 0; j < image.bitmap.height; j++) {
      visited[i][j] = 0;
    }
  }
  var path = new Array();
  return SolveRec(path, visited, PixelArray, Start, End);
}

/*
  READ IMAGE
*/
async function mainSolver(filename, Start, End, crop, solve){
  ////console.log("START SOLVE")
  ////console.log("START SOLVE")
  ////console.log("START SOLVE")
  ////console.log("START SOLVE")
  ////console.log("START SOLVE")
  ////console.log("START SOLVE")
  ////console.log("START SOLVE"
  //////console.log("START", Start);
  //////console.log("END", End);
  var image = await Jimp.read(filename);
  //image.resize(400, Jimp.AUTO);
  image.quality(1);
  //////console.log("FIX", image);
  image = fixImage(image, Start, End, crop);
  //////console.log("FIX END");
  var PixelArray = readMaze(image);
  var imageResult;

  if (solve == true){
    ////console.log("SOLVE MAZE");
    var path = SolveMaze(image, PixelArray, Start, End);
    //console.log("DONE SOLVING", path);
    if(path[0] == true){
      console.log("ADD PATH")
      image = await AddPath(path[1], image);
    }else{
      console.log("ADD VISITED");
      //console.log("PRINT VISITED", path[1]);
      image = await Addvisited(path[1], image);
    }
  }

  imageResult = await image.getBase64Async(image.getMIME());
  return imageResult;
}

export default mainSolver;
