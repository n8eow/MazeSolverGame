import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import readMaze from "../methods/MazeRead.js"
import readImage from "../methods/ImageStart.js"
import GetDimens from "../methods/GetDimens.js"
import MazeImage from "../components/MazeImage.js"
import Slider from "../components/Slider";

//var Mazenum = 1;
//console.log(readMaze('../../static/maze' + Mazenum + '.jpg'));
//console.log("DONE");
///console.log("START READ IMAGE");
//var EncodedImage = readImage('../../static/maze' + Mazenum + '.jpg');
//console.log("END READ IMAGE")
//console.log("ENCODED IMAGE", EncodedImage)
//const imgSrc = readImage('../../static/maze' + Mazenum + '.jpg');

class IndexPage extends React.Component{

  constructor(props){
    super(props);
    this.HandleSlide = this.HandleSlide.bind(this);
    this.HandleClick = this.HandleClick.bind(this);
  }

  state = {
    Mazenum : 1,
    //Image : {},
    fileName : '../../static/maze1.jpg',
    Height: 0,
    Width: 0,
    Start : {X: 0, Y: 0},
    End : {X: 0, Y: 0},

  };

  HandleSlide(e){
    e.preventDefault();
    var slider = document.getElementById(e.target.id);
    var output = document.getElementById(e.target.id + 'span');
    output.innerHTML = slider.value;
  }
  HandleClick(e){
    console.log("HANDLECLICK")
    e.preventDefault();
    var sliderA = document.getElementById("H1span");
    var sliderB = document.getElementById("H2span");
    var sliderC = document.getElementById("W3span");
    var sliderD = document.getElementById("W4span");
    console.log("SLIDERS", sliderA.innerHTML, sliderB.innerHTML, sliderC.innerHTML, sliderD.innerHTML);
      this.setState(() => {
        return{
          Start : {X: sliderC.innerHTML, Y: sliderA.innerHTML},
          End : {X: sliderD.innerHTML, Y: sliderB.innerHTML}
        };
      });
      console.log("NEW STATe", this.state);
    }




  async componentDidMount(){

    const Mazenum = 1;
    var Start = this.state.Start;
    var End = this.state.End;
    //const Image = await readImage('../../static/maze' + Mazenum + '.jpg', Start, End);
    const filename = '../../static/maze' + Mazenum + '.jpg';
    const Dimens = await GetDimens(filename);
    //const Height = Dimens.Height;
    //const Width = Dimens.Width;
    //var EncodedImage = await EncodeImage(Image);
    //console.log("IMAGE did mount", Image);
    //console.log("ENCODED IMAGE MOUNT", EncodedImage);

    this.setState(() => {
      return {
        Mazenum : Mazenum,
        fileName : filename,
        Height: Dimens.height,
        Width: Dimens.width,
        Start : Start,
        End : End,
        //Image : Image
      };


    });

  }
  render(){
    return(
    <Layout>
      <SEO title="Home" />
      <div>
      <h1>Hi boyzzzx</h1>

      <div>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Width} id = "H1" />
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Width} id = "H2" />
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Height} id = "W3" />
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Height} id = "W4" />
        <button onClick = {this.HandleClick}>Solve Maze</button>
      </div>

      <MazeImage File = {this.state.fileName} Start = {this.state.Start} End = {this.state.End}/>
      <Link to="/page-2/">Go to page 2</Link>
      </div>
    </Layout>
    );

  }
}

export default IndexPage
