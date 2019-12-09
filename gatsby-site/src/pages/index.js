import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import GetDimens from "../methods/GetDimens.js"
import MazeImage from "../components/MazeImage.js"
import Slider from "../components/Slider";
import styled from 'styled-components';


const Wrapper = styled.div`
  display: grid;
  margin-left: 7%;
  column-gap : .5%
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: repeat(4);
  grid-auto-flow: row;
  text-decoration: none;
`;

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
    this.Crop = this.Crop.bind(this);
    this.Solver = this.Solver.bind(this);
  }

  state = {
    Solve : false,
    crop : {X: 0, Y: 0},
    Mazenum : 1,
    fileName : '../../static/maze4.jpg',
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

    var sliderA = document.getElementById("H1span");
    var sliderB = document.getElementById("H2span");
    var sliderC = document.getElementById("W3span");
    var sliderD = document.getElementById("W4span");
    if (sliderA.innerHTML == "") sliderA.innerHTML = 0;
    if (sliderB.innerHTML == "") sliderB.innerHTML = 0;
    if (sliderC.innerHTML == "") sliderC.innerHTML = 0;
    if (sliderD.innerHTML == "") sliderD.innerHTML = 0;
      this.setState(() => {
        return{
          Start : {X: Number(sliderC.innerHTML), Y: Number(sliderA.innerHTML)},
          End : {X: Number(sliderD.innerHTML), Y: Number(sliderB.innerHTML)}
        };
      });
  }
  Crop(e){
    e.preventDefault();
    var sliderA = document.getElementById("CWspan");
    var sliderB = document.getElementById("CHspan");

      this.setState(() => {
        return{
          crop : {X: Number(sliderA.innerHTML), Y: Number(sliderB.innerHTML)},
        };
      });
  }
  HandleClick(){
    var sliderA = document.getElementById("H1span");
    var sliderB = document.getElementById("H2span");
    var sliderC = document.getElementById("W3span");
    var sliderD = document.getElementById("W4span");
    if (sliderA.innerHTML == "") sliderA.innerHTML = 0;
    if (sliderB.innerHTML == "") sliderB.innerHTML = 0;
    if (sliderC.innerHTML == "") sliderC.innerHTML = 0;
    if (sliderD.innerHTML == "") sliderD.innerHTML = 0;
      this.setState(() => {
        return{
          Start : {X: Number(sliderC.innerHTML), Y: Number(sliderA.innerHTML)},
          End : {X: Number(sliderD.innerHTML), Y: Number(sliderB.innerHTML)}
        };
      });
    }
  Solver(){
    this.setState(() => {
      return{
        Solve : true
      };
    });
  }




  async componentDidMount(){

    const Mazenum = 4;
    var Start = this.state.Start;
    var End = this.state.End;
    var crop = this.state.crop;
    var Solve = this.state.solve
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
        crop : crop,
        Solve : Solve
        //Image : Image
      };


    });

  }
  render(){
    return(
    <Layout>
      <SEO title="Home" />
     <h1>Hi boyzzzx</h1>

      <Wrapper>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Height} id = "H1" type = "Start Up/Down (px)" />
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Width} id = "H2" type = "End Up/Down (px)"/>
        <button onClick = {this.Crop}>Crop Maze</button>
        <button onClick = {this.HandleClick}>Change Start/End</button>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Height} id = "W3" type = "Start Left/Right (px)"/>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Width} id = "W4" type = "ENd Left/Right (px)"/>
        <button onClick = {this.Solver}>Solve Maze</button>
        <div></div>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Width} id = "CW" type = "Crop Width (px)"/>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Height} id = "CH" type = "Crop Height (px)"/>

      </Wrapper>

      <MazeImage File = {this.state.fileName} Start = {this.state.Start} End = {this.state.End} crop = {this.state.crop} solve = {this.state.Solve}/>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
    );

  }
}

export default IndexPage
