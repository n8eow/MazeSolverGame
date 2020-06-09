import inbounds from "../methods/inbounds";


async function AddPath(path, image){
  for(var Position of path){
    image.setPixelColor(0xff0000ff, Position.X, Position.Y);

    if(inbounds(Position.X + 1, Position.Y)){
      image.setPixelColor(0xff0000ff, Position.X + 1, Position.Y);
    }
    if(inbounds(Position.X - 1, Position.Y)){
      image.setPixelColor(0xff0000ff, Position.X - 1, Position.Y);
    }
    if(inbounds(Position.X, Position.Y + 1)){
      image.setPixelColor(0xff0000ff, Position.X, Position.Y + 1);
    }
    if(inbounds(Position.X, Position.Y - 1)){
      image.setPixelColor(0xff0000ff, Position.X, Position.Y - 1);
    }
    if(inbounds(Position.X + 1, Position.Y + 1)){
      image.setPixelColor(0xff0000ff, Position.X + 1, Position.Y + 1);
    }
    if(inbounds(Position.X + 1, Position.Y - 1)){
      image.setPixelColor(0xff0000ff, Position.X + 1, Position.Y - 1);
    }
    if(inbounds(Position.X - 1, Position.Y - 1)){
      image.setPixelColor(0xff0000ff, Position.X - 1, Position.Y - 1);
    }
    //console.log("Position", Position.X, Position.Y);

  }
  return image;
}

export default AddPath;
