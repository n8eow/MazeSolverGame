import inbounds from "../methods/inbounds";

function ValidMove(Direction, Start, PixelArray, visited){
  if(Direction == "U"){
    if (inbounds(Start.X, Start.Y - 1, PixelArray.length, PixelArray[0].length)
      && PixelArray[Start.X][Start.Y - 1] != 0 && visited[Start.X][Start.Y - 1] != 1){
      return true;
    }
    return false;
  }else if(Direction == "D"){
    if (inbounds(Start.X, Start.Y + 1, PixelArray.length, PixelArray[0].length)
      && PixelArray[Start.X][Start.Y + 1] != 0 && visited[Start.X][Start.Y + 1] != 1){
      return true;
    }
    return false;

  }else if (Direction == "L"){
    if (inbounds(Start.X - 1, Start.Y, PixelArray.length, PixelArray[0].length)
      && PixelArray[Start.X - 1][Start.Y] != 0 && visited[Start.X - 1][Start.Y] != 1){
      return true;
    }
    return false;
  }else{
    if (inbounds(Start.X + 1, Start.Y, PixelArray.length, PixelArray[0].length)
      && PixelArray[Start.X + 1][Start.Y] != 0 && visited[Start.X + 1][Start.Y] != 1){
      return true;
    }
    return false;
  }
}
export default ValidMove;
