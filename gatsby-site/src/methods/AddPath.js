async function AddPath(path, image){
  console.log("PATH", path);
  for(var position of path){
    image.setPixelColor(0xff0000ff, position.X, position.Y);
    //console.log("position", position.X, position.Y);

  }
  return image;
}

export default AddPath;
