function maxes(Up, Down, Left, Right){
  var Moves = [];
  for(var i = 0; i < 4; i++){
    if ((Down <= Up) && (Down <= Left) && (Down <= Right)){
      Moves.unshift("D");
      Down = Number.POSITIVE_INFINITY;
    }
    else if ((Up <= Down) && (Up <= Left) && (Up <= Right)){
      Moves.unshift("U");
      Up = Number.POSITIVE_INFINITY;
    }
    else if ((Right <= Down) && (Right <= Left) && (Right <= Up)){
      Moves.unshift("R");
      Right = Number.POSITIVE_INFINITY;
    }
    else{
      Moves.unshift("L");
      Left = Number.POSITIVE_INFINITY;
    }
  }
  //console.log(" MAXES MOVES", Moves);
  return Moves;
}

function computeDirectionPriority(Start, End){
  var Up = Start.Y - End.Y;
  var Down = End.Y - Start.Y;
  var Left = Start.X - End.X;
  var Right = End.X - Start.X;
  //console.log("UDLR", Up, Down, Left, Right);
  return maxes(Up, Down, Left, Right);
}

export default computeDirectionPriority;
