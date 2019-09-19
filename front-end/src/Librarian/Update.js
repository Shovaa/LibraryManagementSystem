import React,{Component} from 'react';
import Input from '../components/input/input';
import axios from 'axios';
import '../App.css';

class Update extends Component{
    constructor(props){
        super();
    this.state ={
        ISBN: "",
        Quantity:"",
        date:new Date()
    };
}
onChange = date => this.setState({ date }) 
onSubmitHandler = (event) => {
    var data = {
        ISBN: this.state.ISBN,
        Quantity: this.state.Quantity,
    }

    axios.post('http://localhost:8081/updatebooks', data)
        .then(res => {
            console.log(res.data);
            if(res.data=='Record updated'){
                alert(this.state.Quantity+ ' '+'of ISBN:'+' '+ this.state.ISBN + ' '+ 'added');
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log("Error");
        });
    console.log(this.state.Quantity);
    console.log(this.state.barcodes);
}
render(){
    return(
        <div className="App">
            <div className="left">
        <h1 className="Header">UPDATE BOOK</h1>

        <div >
    <Input 
        inputSize="inputSmall"
        type="number" 
        placeholder='ISBN'
        value={this.state.ISBN}
        changed={e => this.setState({ISBN:e.target.value})}
        />
    </div>
    <div>
    <Input 
        inputSize="inputSmall"
        type="number" 
        placeholder='Quantity'
        value={this.state.Quantity}
        changed={e => this.setState({Quantity:e.target.value})}
        />
        </div>
        <br/>
        <br/>
        <button class="button2 button5" onClick={this.onSubmitHandler}>Update</button>
    </div>
  
    </div>
    );
}
}
export default Update;