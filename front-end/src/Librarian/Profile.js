import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Input from '../components/input/input';
import '../Librarian/Homepage.css'

class LProfile extends Component{
  constructor(props) {
    super();
    this.state = {
      
            
      items: [], 
      Issued: [], 
      date:new Date()
        };
    
      }
      onChange = date => this.setState({ date }) 

    Logout=(e)=>{
       localStorage.clear();
       window.location.reload();
    }
    componentDidMount(){
        axios.post("http://localhost:8081/getstudentdata")
        .then(res=>{
            console.log(res.data);
           
            this.setState({items:res.data});
                console.log(this.state.items);
              })
            }
            logut=(e)=>{
              localStorage.clear();
              window.location.reload();
            }
    render(){
      
        return(
            <div>
            
             <div className="name"> Name:&nbsp;&nbsp;{this.state.items[1]}</div>
             <br/>
             <div className="name"> Address:&nbsp;&nbsp;{this.state.items[4]}</div>
             <br/>
             <div className="name"> Phoneno:&nbsp;&nbsp;{this.state.items[5]}</div>
             <br/>
             <br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to='/change-password'>Change Password</NavLink>
             <br/>
             <div><button class="button2 button5"onClick={this.logut}>Logout</button></div>
              
         
         
             </div>
             )
             }
             }
             export default LProfile;