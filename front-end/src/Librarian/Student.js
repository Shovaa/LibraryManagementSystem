import React, { Component } from 'react';
import Input from '../components/input/input';
import '../App.css';
import axios from 'axios';
import { regExpLiteral } from '@babel/types';

class Student extends Component {

    constructor(props) {
        super();
        this.state = {
            Rollno: "",
            RollQuery : [],
            Barcode:"",
            Title:""
        };
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
      //  sessionStorage.setItem('something', 'somevalue');
    //   if (regExpLiteral("[0-9]+", this.state.Rollno)){
       axios.get('http://localhost:8081/studentprofile', {
                params: {
                  rollno: this.state.Rollno
                }}
            )
             .then(res => {
                this.setState({RollQuery: res.data})
                console.log(res.data);
                this.setState({Title:this.state.RollQuery.map((item,index)=>{
                    console.log(item);
                     return(
                        <div>{item.Title}</div> 
                      
                     )
                    
                })

            
                })
                console.log(this.state.Title);
    })
}
onConfirmHandler=(title, barcode)=>{
    console.log("Title and barcode is", title, barcode);
    var data={
        Barcode:this.state.Barcode,
        Rollno:this.state.Rollno,
        Title:title
    }

      axios.post('http://localhost:8081/confirmreserve',data)
      .then(res => {
              console.log(res.data);
          })
          .catch((error) => {
              console.log("Error");
          });
}

render() {
    return (

        <div className="App">
            <h1 className="Header">Student Profile</h1>
            
            <div>
                <Input
                    inputSize="inputSmall"
                    type="number"
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
                // console.log(item);
                 return(
                     <div>
                    
                        <div><ul>SN:{item.SN} &nbsp;&nbsp;
                     Roll:{item.Rollno}&nbsp;&nbsp;
                    Title:{item.Title} &nbsp;&nbsp;
                    <Input
                    inputSize="input"
                    type="number"
                    placeholder='Barcode'
                    value={this.state.Barcode}
                    changed={e => this.setState({ Barcode: e.target.value })}
                />
                      <button onClick={() => this.onConfirmHandler(item.Title, this.state.Barcode)}>Confirm</button></ul></div>
                     
                    
                     </div>
                    )
             })}
                  </div> 
           </div>
        </div>

    );
}
}


export default Student;