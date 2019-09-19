import React, { Component } from 'react';
import Input from '../components/input/input';
import '../App.css';
import axios from 'axios';

import './Homepage.css';

import { regExpLiteral } from '@babel/types';

class Profile extends Component {

    constructor(props) {
        super();
        this.state = {
            Rollno: "",
            RollQuery : [],
            items : [],
            rollls:[],
            Barcode:"",
            Title:"",
            Return:"",
            date:new Date()
        };
    }
    onChange = date => this.setState({ date }) 
onSubmitHandler = (event) => {
  {
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
        axios.get("http://localhost:8081/getspecificstudentdata", {
            params: {
              rolls: this.state.Rollno
            }
          })
        .then(res=>{
            console.log(res.data);
            console.log("Nirva")
            this.setState({rollls:res.data});
                console.log(this.state.rollls);
              })
}
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
ConfirmHandler=(e)=>{
    this.props.history.push('/confirm-reserve')
}
IssueHandler=(e)=>{
    this.props.history.push('/return-book')
}
render() {
return (

    <div className="App ">
        <div className="left">
        <h1 className="Header">Student Profile</h1>
       
        <div className="left">
            <Input
                inputSize="inputSmall"
                type="text"
                placeholder='Rollno'
                value={this.state.Rollno}
                changed={e => this.setState({ Rollno: e.target.value })}
            />
             <button  class="button2 button5" onClick={this.onSubmitHandler}>Submit</button>
             <br/>
             <br/>
             <br/>
             </div>
        </div>
        
       <div>
           <div className="name">
           {this.state.rollls.map((item,index)=>{
             console.log(item);
           
                return(
                    <div>
                    <div className="an">
             <div className="name"> Roll:&nbsp;&nbsp;{item.rollno}</div>
             <div className="name"> Name:&nbsp;&nbsp;{item.name}</div>
             <div className="name"> Address:&nbsp;&nbsp;{item.address}</div>
             <div className="name"> Phoneno:&nbsp;&nbsp;{item.contactnum}</div>
             </div>
                    &nbsp;&nbsp;
           </div>
                )}
           )}
           </div>
</div>
           
       <div>  
       <div className="searchhead search" >
                      <div>ISBN</div>
                      <div>Title</div>
                      <div>Barcode</div>
                      
              </div>
         
         {this.state.RollQuery.map((item,index)=>{
             console.log(item);
             if (item.Confirm){
                return(
                    <div className="search">
                    <div>  {item.ISBN}</div>
                   <div> {item.Title}  </div>
                    <div>{item.Barcode}</div>
                    <div><button class="button button5" onClick={this.IssueHandler}>Return</button></div>
                    </div>
                   
                )
            }
            else {
                let vr = new Date(item.Reservetime);
            let date = vr.toISOString();
                return(
                    <div>
                    <div className="search">
                   <div>{item.ISBN}</div>
                   <div> {item.Title}  </div>
                   <div>{date}</div>
                    &nbsp;&nbsp;
                    <div><button class="button button5" onClick={this.ConfirmHandler}>Issue</button></div>
                    </div>
                    </div>
                
                )
            }
         })}
        </div> 
    
    
       
        {/* <div className='calendar'> <Calendar
          onChange={this.onChange}
          value={this.state.date}
        /> 
        </div> */}
 
</div>
)
}
}
export default Profile;