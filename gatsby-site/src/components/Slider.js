import React from "react";
import styled from 'styled-components';
//import 'Slider.css'

const Range = styled.input`
  type="range";
  min="0";
  max= {props.max};
  value="0";
  class="slider";
  id={props.id};
  onInput={props.HandleSlide};
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
`;
const Wrapper = styled.div`
  display: grid;
  margin-left: 7%;
  column-gap : .5%
  grid-template-columns: repeat(4, 5px);
  grid-template-rows: repeat(4, 30px);
  grid-auto-flow: row;
  text-decoration: none;
`;

const Slider = (props) => {
  var spanId= props.id + "span";

  return (
  <div>
    <input type="range" min="0" max= {props.max} id={props.id} onInput={props.HandleSlide} heigh = "2px" ></input>
    <p>{props.type} <span id={spanId}></span></p>
    </div>
  );
}
export default Slider;
