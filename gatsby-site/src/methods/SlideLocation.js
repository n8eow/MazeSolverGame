import inbounds from "../methods/inbounds.js";


function SlideLocation(image, Start, End){

  if(Start.X != 0 || End.X != 0 || Start.Y != 0 || End.Y != 0){

      for(var i = Start.X - 4; i < Start.X + 4; i++){
        for(var j = Start.Y - 4; j < Start.Y + 4; j++){
          if(inbounds(i, j, image.bitmap.width, image.bitmap.height)){
            image.setPixelColor(0xff0000ff, i, j);
          }
        }
      }
      for(var i = End.X - 4; i < End.X + 4; i++){
        for(var j = End.Y - 4; j < End.Y + 4; j++){
          if(inbounds(i, j, image.bitmap.width, image.bitmap.height)){
            image.setPixelColor(0x00ff00ff, i, j);
          }
        }
      }
  }
      return image;
}
export default SlideLocation;
