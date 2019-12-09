import mainSolver from "../methods/Solver.js";
import React from "react";
class MazeImage extends React.Component{

  constructor(props){
    super(props);
  }

  state = {
    crop : {},
    ImageSrc : {},
    Start : {X: 0, Y: 0},
    End : {X: 0, Y: 0},
    solve : false
  };

  /*<MazeImge Image = {this.state.Image} StartX = {this.state.StartX} StartY = {this.state.StartX}
  EndX = {this.state.StartX} EndY = {this.state.StartX} />*/

  async componentDidUpdate(){
    //console.log("UPDATE", this.props);
    //console.log(this.state);
    if((this.props.Start.X != this.state.Start.X) || (this.props.End.Y != this.state.End.Y)
     ||(this.props.Start.Y != this.state.Start.Y) || (this.props.End.X != this.state.End.X)
     ||(this.props.crop.X  != this.state.crop.X  )|| (this.props.crop.Y  != this.state.crop.Y)
     || this.props.solve != this.state.solve){
      var ImageSrc = await mainSolver(this.props.File, this.props.Start, this.props.End, this.props.crop, this.props.solve);
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


  async componentDidMount(){
    //console.log("MAZE IMAGE");
    var ImageSrc = await mainSolver(this.props.File, this.props.Start, this.props.End, this.props.crop);
      this.setState(() => {
        return {
          solve : this.props.solve,
          crop : this.props.crop,
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
