import React from "react";
import styled from 'styled-components';
//import 'Slider.css'

const Input = styled.input`
  width : 100%;
`;

const Paragraph = styled.p`
  font-size : 22px;
`;

const Wrapper = styled.div`
  background-color : white;
  width : 230px;
  height : 75%;
  padding : 10px;
  border : 10px

`;

const Slider = (props) => {
  var spanId= props.id + "span";

  return (
  <Wrapper>
    <Input type="range" min="0" max= {props.max} id={props.id} onInput={props.HandleSlide} width= "100%" height = "100%"></Input>
    <Paragraph><b>{props.type}</b> <span id={spanId}></span></Paragraph>
  </Wrapper>
  );
}
export default Slider;
