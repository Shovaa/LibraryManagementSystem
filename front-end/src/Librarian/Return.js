import React, { Component } from 'react';
import Input from '../components/input/input';
import '../App.css';
import axios from 'axios';

import { regExpLiteral } from '@babel/types';

class Return extends Component {

    constructor(props) {
        super();
        this.state = {
            Rollno: "",
            RollQuery : [],
            Barcode:"",
            Title:"",
            Return:""
        };
    }
onSubmitHandler = (event) => {
  {
    var rol=/[0-9][0-9][0-9][Bb][CEMGAcemga][TELXIMtelxim][0-9][0-9][0-9]/;
    if(rol.test(this.state.Rollno)==false){
 alert('Rollno in format 073BCT604 i.e YearFacultyRoll');
    }
    else{
    console.log(this.state.Rollno);
   axios.get('http://localhost:8081/gettingissuedata', {
            params: {
              rollno: this.state.Rollno
            }}
        )
         .then(res => {
            this.setState({RollQuery: res.data})
            console.log(res.data);
        })
}
  }
}
onReturnHandler=(title, barcode)=>{
console.log("Title and barcode is", title, barcode);
var data={
    Barcode:barcode,
    Rollno:this.state.Rollno,
    Title:title
}

  axios.post('http://localhost:8081/returnbook',data)
  .then(res => {

          console.log(res.data);
          if(res.data=='Book Returned'){
              alert(title + 'Book returned');
              window.location.reload();
          }
      })
      .catch((error) => {
          console.log("Error");
      });
}

render() {
return (

    <div className="App">
        <h1 className="Header">Return Book</h1>
        
        <div>
            <Input
                inputSize="inputSmall"
                type="text"
                placeholder='Rollno'
                value={this.state.Rollno}
                changed={e => this.setState({ Rollno: e.target.value })}
            />
             <button onClick={this.onSubmitHandler}>Submit</button>
             <br/>
             <br/>
             <br/>
        </div>
        
       <div>
       <div>  
         
         {this.state.RollQuery.map((item,index)=>{
             console.log(item);
             if (item.Confirm){
                return(
                    <div>
                    <div>SN:{item.SN} &nbsp;&nbsp;
                    Roll:{item.Rollno}&nbsp;&nbsp;
                    Title:{item.Title}  &nbsp;&nbsp;
                    Barcode:{item.Barcode}
                    &nbsp;&nbsp;
                    </div>
                    <button onClick={() => this.onReturnHandler(item.Title, item.Barcode)}>Return</button></div>
                )
            }
            else{
                alert(' book not issued');
            }
         })}
        </div> 
       </div>
    </div>

)
}
}
export default Return;