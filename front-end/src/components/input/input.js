import React from 'react';
import './input.css';


function Input(props){
    return(
        <input
         className={props.inputSize}
         placeholder={props.placeholder}
         onChange={props.changed}
         type={props.type}
         />
     )
}
export default Input;
