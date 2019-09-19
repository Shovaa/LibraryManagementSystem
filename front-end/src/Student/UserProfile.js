import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Input from '../components/input/input';
import '../Librarian/Homepage.css'
import { isTSTypeElement } from '@babel/types';
class UserProfile extends Component{
  constructor(props) {
    super();
    this.state = {
      
            
      items: [], 
      Issued: [] 
            
        };
    
      }
    

    Logout=(e)=>{
       localStorage.clear();
       window.location.reload();
    }
   
    componentDidMount(){
        axios.post("http://localhost:8081/getstudentdata")
        .then(res=>{
            console.log(res.data);
            console.log("Nirva")
            this.setState({items:res.data});
                console.log(this.state.items);
              })
        axios.get("http://localhost:8081/getstudentissuedata")

         .then(res=>{
            console.log(res.data);

            this.setState({Issued:res.data});
               
              })
    }
  
    
    render(){
      
        return(
            <div className="an">
             <div className="name"> Roll:&nbsp;&nbsp;{this.state.items[1]}</div>
             <div className="name"> Name:&nbsp;&nbsp;{this.state.items[4]}</div>
             <div className="name"> Address:&nbsp;&nbsp;{this.state.items[5]}</div>
             <div className="name"> Phoneno:&nbsp;&nbsp;{this.state.items[6]}</div>
             <br/>
             <br/>
             <div className="searchhead search" >
                     
                      <div>ISBN</div>
                      <div>Title</div>
                      <div>Issued</div>
                      <div>Issued By</div>
                      <div>Reserved</div>
                      
              </div>
          {this.state.Issued.map((item, index) => {
            console.log(item);
            
            let vr = new Date(item.Reservetime);
            let date = vr.toString();
            if(item.Confirm){
            return (
              <div className="search" >
                <div>{item.ISBN}</div>
                <div>{item.Title}</div>
                <div>{item.Barcode}</div>
                <div>{item.Issuedby}</div>
              
               </div>
            )
            }
            else{
              return(
                <div className="search" >
                <div>{item.ISBN}</div>
                <div>{item.Title}</div>
                <div></div>
                <div></div>
                
                <div>{date}</div>
               </div>
              )
            }
          })
        
        }
            <br/>
            <br/>
             <NavLink to='/change-password'>Change Password</NavLink>
             <br/>
             <br/>
             <button className="button5" onClick={this.Logout}>Logout</button>
       
          
    </div>
              
            
    
        )
    }
}
export default UserProfile;