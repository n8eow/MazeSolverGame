import mainSolver from "../methods/Solver.js";
import React from "react";
import SlideLocation from "../methods/SlideLocation.js";
import styled from 'styled-components';


var Jimp = require('jimp');
const Centered = styled.div`
  text-align: center;
`;
const Image = styled.img`
  width: 2000px;
`;

class MazeImage extends React.Component{

  constructor(props){
    super(props);
  }

  state = {
    file: {},
    crop : {},
    ImageSrc : {},
    Image: {},
    Start : {X: 0, Y: 0},
    End : {X: 0, Y: 0},
    solve : false
  };

  /*<MazeImge Image = {this.state.Image} StartX = {this.state.StartX} StartY = {this.state.StartX}
  EndX = {this.state.StartX} EndY = {this.state.StartX} />*/

  async componentDidUpdate(){
    //console.log("COMPONENT UPDATE", this.props, this.state);
    var ImageSrc = this.state.ImageSrc;
    var Image = this.state.Image;
    if((this.props.Start.X != this.state.Start.X) || (this.props.End.Y != this.state.End.Y)
     ||(this.props.Start.Y != this.state.Start.Y) || (this.props.End.X != this.state.End.X)
     ||(this.props.crop.X  != this.state.crop.X  )|| (this.props.crop.Y  != this.state.crop.Y)
     || (this.props.solve != this.state.solve) || (this.props.File != this.state.file)){
       //console.log("CHANGES")
      if((this.props.crop.X  != this.state.crop.X  )|| (this.props.crop.Y  != this.state.crop.Y)
      || (this.props.solve != this.state.solve) || (this.props.File != this.state.file)){
        //console.log("BIG CHANGE");
        var Images = await mainSolver(this.props.File, this.props.Start, this.props.End, this.props.crop, this.props.solve);
        ImageSrc = Images[0]
        Image = Images[1]
        this.setState(() => {
          //console.log("SETTING IMAGE TO DIFFERENT STATE");
          return {
            file: this.props.File,
            Image : Image,
            solve : this.props.solve,
            crop : this.props.crop,
            ImageSrc : ImageSrc,
            Start : this.props.Start,
            End : this.props.End
          };
        });
      }else{
        //console.log("LITTLE CHANGE");
        var ModImage = await this.state.Image.clone()
        var ImageResult = SlideLocation(ModImage, this.props.Start, this.props.End)
        ImageSrc = await ImageResult.getBase64Async(ImageResult.getMIME());
        this.setState(() => {
          return {
            solve : this.props.solve,
            crop : this.props.crop,
            ImageSrc : ImageSrc,
            Start : this.props.Start,
            End : this.props.End
          };
        });
      }

     }
     //console.log("FINISH UPDATE");
  }


  async componentDidMount(){
    //console.log("MAZE IMAGE");
    //console.log("FILENAME", this.props.File);
    var Images = await mainSolver(this.props.File, this.props.Start, this.props.End, this.props.crop, this.props.solve);
    var ImageSrc = Images[0];
    var Image = Images[1];
    //console.log("IMAGESRC", ImageSrc);
      this.setState(() => {
        //console.log("SETTING IMAGE TO DIFFERENT STATE");
        return {
          file: this.props.File,
          solve : this.props.solve,
          crop : this.props.crop,
          ImageSrc : ImageSrc,
          Image : Image,
          Start : this.props.Start,
          End : this.props.End,
        };
      });

  }

  render(){
    return(
      <Centered>
        <Image src = {this.state.ImageSrc}></Image>
      </Centered>
    );
  }
}
export default MazeImage
