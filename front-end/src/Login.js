import React, { Component } from 'react'
import axios from 'axios';
import { Route , withRouter,NavLink} from 'react-router-dom';
import StudentHome from './Student/StudentHome';
import Input from './components/input/input'

class Login extends Component{
    constructor(props){
        super();
        this.state ={
            email:"",
            emailt:"",
            pass:"",
            passt:""
        };
}

    StudentHandler=(e)=>{

        axios.post("http://localhost:8081/login", {email: this.state.email, pass: this.state.pass})
        .then((res)=>{
            if (res.data.email == this.state.email){
                localStorage.setItem("usertype", "student")
                localStorage.setItem("token", res.data.token)
                window.location.reload();
            }
        })
        
    }
    
    TeacherHandler=(e)=>{

        axios.post("http://localhost:8081/tchrlogin", {email: this.state.emailt, pass: this.state.passt})
        .then((res)=>{
            console.log (res)
            if (res.data.email == this.state.emailt){
                if (res.data.isadmin == 0){
                    localStorage.setItem("usertype", "teacher")
                    alert("hello")
                }
                else{
                    localStorage.setItem("usertype", "bigteacher")
                    
                }
                localStorage.setItem("token", res.data.token)
                window.location.reload();
            }
        })
        
    }
    render(){
        return(
            <div className='s'>
                <div className="main"><h1>LIBRARY MANAGEMENT SYSTEM</h1></div>
            <div className = "stdlogin">
            <div className="std"> Student Login</div>
                <br></br>
                <div className="names">
                Email
                <Input
                inputSize="inputSall"
                 type = "text" 
                value={this.state.email}
                changed={e=>this.setState({email:e.target.value})}
                />
                </div>
                <br></br>
                <div className="names">
                Password
                <Input 
                 inputSize="inputSl"
                 type = "password" 
                 value={this.state.pass}

                changed={e=>this.setState({pass:e.target.value})}/>
                </div>
<br></br>
<br/>
<br></br>
                <button class="button button5" onClick={this.StudentHandler} >LOGIN</button>
            </div>

        

            <div className = "tchrlogin">
              <div className="std">Librarian Login</div>  
                <br></br>
               <div className="names">Name 
                <Input
                inputSize="inputSall"
                 type = "text" 
                value={this.state.emailt}
                changed={e=>this.setState({emailt:e.target.value})}
                />
                </div>
                
                <br></br>
              <div className="names">
                Password
            
                <Input 
                 inputSize="inputSl"
                 type = "password" 
                 value={this.state.passt}

                changed={e=>this.setState({passt:e.target.value})}/>
                </div>
                <br></br>
<br/>
<br></br>
            <div > <button class="button button5" onClick={this.TeacherHandler} >LOGIN</button></div>   
            </div>
            </div>
        )
    }
}
export default Login;
