
import fixImage from "../methods/fixImage";
import readMaze from "../methods/readMaze";
import makeArray from "../methods/makeArray";
import ValidMove from "../methods/ValidMove";
import changeStart from "../methods/ModStartObj";
import AddPath from "../methods/AddPath.js";

var Heap = require('heap');
var Jimp = require('jimp');
var SimpleHashTable = require('simple-hashtable');
/* SOLVE THE MAZE */
/*
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
*/
function reportPath(curr, Table, End){
  var path = new Array();
  while (curr != null){
    if((curr.X != End.X) && (curr.Y != End.Y)){
      return path;
    }
    path.unshift(curr);
    curr = Table.get(curr);
  }
  return [];
}

function DFSolve(visited, PixelArray, Start, End){
  console.log("DFS SOLVE")
  var heap = new Heap(function(a, b) {
    return (Math.abs(End.X - a.X) + Math.abs(End.Y - a.Y)
    - Math.abs(End.X - b.X) + Math.abs(End.Y - b.Y));
  });

  heap.push({X: Start.X + 1, Y: Start.Y})
  heap.push({X: Start.X + 2, Y: Start.Y})
  heap.push({X: Start.X + 3, Y: Start.Y})
  heap.push({X: Start.X + 1, Y: Start.Y + 1})
  heap.push({X: Start.X + 2, Y: Start.Y + 2})
  heap.push({X: Start.X + 1, Y: Start.Y + 5})
  heap.push({X: Start.X + 6, Y: Start.Y})
  heap.push({X: Start.X + 8, Y: Start.Y})
  heap.push({X: Start.X + 16, Y: Start.Y})
  console.log("POPPING", heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop(), heap.pop());

  heap.push(Start)
  var Curr;
  var Table = new SimpleHashTable()
  var Moves = ["U", "D", "L", "R"];
  var iterations = 0;
  while (heap.empty() != true){
    iterations += 1;
    console.log("iterations", iterations);
    Curr = heap.pop();
    console.log("CURR", Curr);
    if (Curr.X == End.X && Curr.Y == End.Y){
      console.log("FINAL PATH", reportPath(Curr, Table, End));
      return reportPath(Curr, Table, End);
    }
    if (iterations > 30000){
      console.log("too many iterations");
      return [];
    }
      for (var move of Moves){
        if(ValidMove(move, Start, PixelArray, visited)){
          console.log("PUSH ONTO HEAP", changeStart(Curr, move))
          var NewSpot = changeStart(Curr, move);
          heap.push(NewSpot);
          Table.put(NewSpot, Curr);
        }
      }
    }
  }





function SolveMaze(image, PixelArray, Start, End){
  var visited = makeArray(image.bitmap.height, image.bitmap.width)
  for (var i = 0; i < image.bitmap.width; i++) {
    for (var j = 0; j < image.bitmap.height; j++) {
      visited[i][j] = 0;
    }
  }
  return DFSolve(visited, PixelArray, Start, End);
}

/*
  READ IMAGE
*/
async function mainSolver(filename, Start, End, crop, solve){

  var image = await Jimp.read(filename);
  //image.resize(400, Jimp.AUTO);
  image.quality(1);
  //////console.log("FIX", image);
  image = fixImage(image, Start, End, crop);
  //////console.log("FIX END");
  var PixelArray = readMaze(image);
  var imageResult;

  if (solve == true){
    var path = SolveMaze(image, PixelArray, Start, End);
    console.log("ADD PATH");
    image = await AddPath(path, image);
  }

  imageResult = await image.getBase64Async(image.getMIME());
  return imageResult;
}

export default mainSolver;
