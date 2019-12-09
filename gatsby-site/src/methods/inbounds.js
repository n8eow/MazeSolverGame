function inbounds(i,j, width, height){
  if (i > width || i < 0 || j > height || j < 0){
    return false;
  }
  return true;
}

export default inbounds;




