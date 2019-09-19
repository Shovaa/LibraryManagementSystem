import React, { Component } from 'react';
import Input from '../components/input/input';
import '../App.css';
import axios from 'axios';

class Post extends Component{
    constructor(props){
        super();
    this.state ={
      Post:"",
      Subject:"",
      date:new Date()
    };
}
postHandler=(e)=>{
    var data={
        Subject:this.state.Subject,
        Post:this.state.Post
    }
    axios.post('http://localhost:8081/postnotice',data)
    .then(res => {
  
            console.log(res.data);
            if(res.data=='Notice Posted'){
                alert('Notice posted');
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log("Error");
        });
}
  onChange = date => this.setState({ date }) 
render(){
    return(
  <div className="left">

       <Input
      inputSize="inputSmall"
      type="text"
      placeholder="Subject"
      value={this.state.Subject}
      changed={e => this.setState({ Subject: e.target.value })}
      />
      <Input
      inputSize="inputSmall"
      type="text"
      placeholder="Notice"
      value={this.state.Post}
      changed={e => this.setState({ Post: e.target.value })}
      />
    
      
      <button className="button button5" onClick={this.postHandler}>Post</button>
       
  </div>
    )
}
}
export default Post;
