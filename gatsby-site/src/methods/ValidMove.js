import inbounds from "../methods/inbounds";

function ValidMove(Direction, Start, PixelArray, visited){
  //console.log("VALID MOVE", Start, Direction);
  //console.log("START +1", Start.X + 1);
  if(Direction == "U"){
    //console.log("UP", Start, PixelArray[Start.X][Start.Y - 1], visited[Start.X][Start.Y - 1])
    if (inbounds(Start.X, Start.Y - 1, PixelArray.width, PixelArray.height)
      && PixelArray[Start.X][Start.Y - 1] != 0 && visited[Start.X][Start.Y - 1] != 1){
      return true;
    }
    return false;
  }else if(Direction == "D"){
    //console.log("down", Start, PixelArray[Start.X][Start.Y + 1], visited[Start.X][Start.Y + 1])
    if (inbounds(Start.X, Start.Y + 1, PixelArray.width, PixelArray.height)
      && PixelArray[Start.X][Start.Y + 1] != 0 && visited[Start.X][Start.Y + 1] != 1){
      return true;
    }
    return false;

  }else if (Direction == "L"){
    //console.log("Left", Start, PixelArray[Start.X - 1][Start.Y], visited[Start.X - 1][Start.Y])
    if (inbounds(Start.X - 1, Start.Y, PixelArray.width, PixelArray.height)
      && PixelArray[Start.X - 1][Start.Y] != 0 && visited[Start.X - 1][Start.Y] != 1){
      return true;
    }
    return false;
  }else{
    //console.log("Right", Start, PixelArray[Start.X + 1][Start.Y], visited[Start.X + 1][Start.Y])
    if (inbounds(Start.X + 1, Start.Y, PixelArray.width, PixelArray.height)
      && PixelArray[Start.X + 1][Start.Y] != 0 && visited[Start.X + 1][Start.Y] != 1){
      return true;
    }
    return false;
  }
}
export default ValidMove;
