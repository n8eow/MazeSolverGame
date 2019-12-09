function PathInsert(Path, obj){
  //console.log("ADD TO PATH", obj);
  var NewPath = Path;
  var PushObj = {X: obj.X, Y: obj.Y};
  NewPath.push(PushObj);
  return NewPath;
}
export default PathInsert;
