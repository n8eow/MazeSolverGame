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
  column-gap : .5%;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3);
  grid-auto-flow: row;
  text-decoration: none;
`;
const Button = styled.button`
  margin-left: 25px
`;
const Header = styled.h1`
  background-color: white;
`;


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
    const Mazenum = 2;
    var Start = this.state.Start;
    var End = this.state.End;
    var crop = this.state.crop;
    var Solve = this.state.solve

    const filename = '../../static/maze' + Mazenum + '.jpg';
    const Dimens = await GetDimens(filename);

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
      };


    });

  }
  render(){
    return(
    <Layout>
      <SEO title="Home" />
     <h1>Nate's Maze Solver</h1>

      <Wrapper>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Height} id = "H1" type = "Start(red) Up/Down" />
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Height} id = "H2" type = "End(green) Up/Down"/>
        <div></div>

        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Width} id = "W3" type = "Start(red) Left/Right"/>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Width} id = "W4" type = "End(green) Left/Right"/>
        <Button onClick = {this.Crop}><b>Crop Maze</b></Button>


        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Width} id = "CW" type = "Crop Width (px)"/>
        <Slider HandleSlide = {this.HandleSlide} max = {this.state.Height} id = "CH" type = "Crop Height (px)"/>
        <Button onClick = {this.Solver}><b>Solve Maze</b></Button>

      </Wrapper>

      <MazeImage File = {this.state.fileName} Start = {this.state.Start} End = {this.state.End} crop = {this.state.crop} solve = {this.state.Solve}/>
    </Layout>
    );

  }
}

export default IndexPage
