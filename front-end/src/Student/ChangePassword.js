import React, { Component } from "react";
import Input from "../components/input/input";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";
//import Axios from 'axios';
//import Button from './components/Button/Button';
import axios from "axios";
class Password extends Component {
  constructor(props) {
    super();
    this.state = {
      Current_Password: "",
      New_Password: "",
      Confirm_Password: ""
    };
  }
  Change=(e)=>{
      var data={
          Current:this.state.Current_Password,
          New:this.state.New_Password
      }
      if(this.state.New_Password==this.state.Confirm_Password){
        

          axios.post('http://localhost:8081/changepassword',data)
    .then(res => {
  
            console.log(res.data);
            if(res.data=='Password Changed'){
                window.location.reload();
                alert('Password Changed Successfully');
               
            }
            else if(res.data=='Current Error'){
                
                alert('Current Password donot matches');

            }
            else{
                window.location.reload();
                alert('Error! Try again')
            }
        })
        .catch((error) => {
            console.log("Error");
        });
      }
      else{
          alert(' New password donot matches Confirm again!')
      }
  }
  render() {
    return (
      <div>
        <div>
          <Input
            inputSize="input"
            type="password"
            placeholder="Current Password"
            value={this.state.Current_Password}
            changed={e => this.setState({ Current_Password: e.target.value })}
          />
        </div>
        <div>
          <Input
            inputSize="input"
            type="password"
            placeholder="New Password"
            value={this.state.New_Password}
            changed={e => this.setState({ New_Password: e.target.value })}
          />
        </div>
        <div>
          <Input
            inputSize="input"
            type="password"
            placeholder="Confirm Password"
            value={this.state.Confirm_Password}
            changed={e => this.setState({ Confirm_Password: e.target.value })}
          />
        </div>
        <div>
            <button onClick={this.Change}>Change</button>
        </div>
      </div>
    );
  }
}
export default Password;