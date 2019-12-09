function changeStart(Start, Direction){
    var NewPlace = {X: 0, Y: 0};
  if (Direction == "U"){
    NewPlace = {X :Start.X, Y: Start.Y - 1};
  }
  else if (Direction == "D"){
    NewPlace = {X :Start.X, Y: Start.Y + 1};
  }
  else if (Direction == "L"){
    NewPlace = {X :Start.X - 1, Y: Start.Y};
  }
  else{
    NewPlace = {X :Start.X + 1, Y: Start.Y};
  }
  return NewPlace;
}

export default changeStart;
