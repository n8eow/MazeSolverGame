async function AddVisited(visited, image){
  //console.log("DIMENS", visited.length, visited[0].length, image.bitmap.width, image.bitmap.height);
  for (var i = 0; i < visited.length; i++) {
    for (var j = 0; j < visited[0].length; j++) {
      if (visited[i][j] == 1){
        image.setPixelColor(0xff0000ff, i, j);
      }
    }
  }
  return image;
}

export default AddVisited;
