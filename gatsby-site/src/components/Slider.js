import React from "react"

const Slider = (props) => {
  var spanId= props.id + "span";

  return (
    <div>
    <input type="range" min="0" max= {props.max} value="0" class="slider" id={props.id} onInput={props.HandleSlide}></input>
    <p>Value: <span id={spanId}></span></p>
    </div>
  );
}
export default Slider;
