import readImage from "../methods/ImageStart.js";
import React from "react";
import PropTypes from "prop-types"


class MazeImage extends React.Component{

  constructor(props){
    super(props);
  }

  state = {
    ImageSrc : {},
    Start : {},
    End : {}
  };

  /*<MazeImge Image = {this.state.Image} StartX = {this.state.StartX} StartY = {this.state.StartX}
  EndX = {this.state.StartX} EndY = {this.state.StartX} />*/

  async componentDidUpdate(){
    console.log("UPDATE", this.props);
    console.log(this.state);
    if((this.props.Start.X != this.state.Start.X) || (this.props.End.Y != this.state.End.Y)
     ||(this.props.Start.Y != this.state.Start.Y) || (this.props.End.X != this.state.End.X)){
      var ImageSrc = await readImage(this.props.File, this.props.Start, this.props.End);
      this.setState(() => {
        return {
          ImageSrc : ImageSrc,
          Start : this.props.Start,
          End : this.props.End
        };
      });
    }
  }


  async componentDidMount(){
    console.log("MAZE IMAGE")
    var ImageSrc = await readImage(this.props.File, this.props.Start, this.props.End);
      this.setState(() => {
        return {
          ImageSrc : ImageSrc,
          Start : this.props.Start,
          End : this.props.End,
        };
      });

  }

  render(){
    return(
      <div>
        <img src = {this.state.ImageSrc}></img>
      </div>
    );
  }
}
export default MazeImage
