import React ,{Component} from 'react';
import Input from '../components/input/input';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
//import Axios from 'axios';
//import Button from './components/Button/Button';
import axios from 'axios';

 class AddStudent extends Component{
    constructor(props){
        super();
    this.state ={
        Rollno: "",
        Name: "",
        Email: "",
        Address: "",
        Contact:""
    };
}

    onSubmitHandler=(event)=>{
       var data={
          Rollno:this.state.Rollno,
          Name:this.state.Name,
          Address:this.state.Address,
          Contact:this.state.Contact,
          Email:this.state.Email
        }
        var rol=/[0-9][0-9][0-9][Bb][CEMGAcemga][TELXIMtelxim][0-9][0-9][0-9]/;
        if(rol.test(this.state.Rollno)==false){
     alert('Rollno in format 073BCT604 or 073bce141 i.e YearFacultyRoll');
        }
        else{
        axios.post('http://localhost:8081/addstudent',data)
        .then(res => {
                console.log(res.data);
                if(res.data=='Student Added'){
                this.props.history.push('/add-student')
                window.location.reload();
                alert(' New Student'+' ' + this.state.Name+' '+'added');
                }
                else{
                    alert('Error in Adding');
                }
            })
            .catch((error) => {
                console.log("Error");
                alert('error in adding');
            });
        }
}
    render() {
        return (
            
                <div className="App">
                    <div className="left">
                    <h1 className="Header">ADD STUDENT</h1>
                    <div>
                <Input 
                    inputSize="inputSmall"
                    type="text" 
                    placeholder='Rollno'
                    maxlength = '9'
                    value={this.state.Rollno}
                    changed={e => this.setState({Rollno:e.target.value})}
                    />
                </div>
                <div>
                    <Input 
                        inputSize="inputSmall"
                        type="text"
                        placeholder='Name' 
                        value={this.state.Name}
                        changed={e=>this.setState({Name:e.target.value})} 
                        />
                </div>
                <div>
                    <Input
                        inputSize="inputSmall"
                        type="text" 
                        placeholder='Address' 
                        value={this.state.Address}
                        changed={e => this.setState({Address: e.target.value })}
                         />
                
                </div>
                <div>
                    <Input
                        inputSize="inputSmall"
                        type="email"
                        placeholder='Email'
                        value={this.state.Email}
                        changed={event => this.setState({Email: event.target.value })} 
                        />
                </div>
                <div>            
                    <Input
                        inputSize="inputSmall"
                        type="number"
                        placeholder='ContactNo' 
                        value={this.state.Contact}
                        changed={e => this.setState({Contact: e.target.value })}
                         />
                </div>
                    <br/>
                    <br/>
                   <button onClick={this.onSubmitHandler}>ADD</button>
                </div>
                   </div>
            
        );
    }
}

export default AddStudent;