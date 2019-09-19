import React ,{Component} from 'react';
import Input from '../components/input/input';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
//import Axios from 'axios';
//import Button from './components/Button/Button';
import axios from 'axios';


 class Form extends Component{
    constructor(props){
        super();
    this.state ={
        ISBN: "",
        Title: "",
        Author: "",
        Publication: "",
        Barcode: "",
        Quantity:"",
        Type:"",
        date:new Date()
    };
}
onChangeHandler=(event)=>{
    this.setState({Quantity:event.target.value})
}
    onSubmitHandler=(event)=>{
       var data={
          Barcode:this.state.Barcode,
          ISBN:this.state.ISBN,
          Title:this.state.Title,
          Author:this.state.Author,
          Publication:this.state.Publication,
          Quantity:this.state.Quantity,
          Type:this.state.Type
        }

        axios.post('http://localhost:8081/addbooks',data)
        .then(res => {
                console.log(res.data);
                this.props.history.push('/add-book')
                window.location.reload();
                alert(' New Book'+' ' + this.state.Title+' '+'added');
            })
            .catch((error) => {
                console.log("Error");
                alert('error in adding');
            });
}
onChange = date => this.setState({ date })
    render() {
        return (
                <div className="App body an">
                <div className="an">
                    <div className="left an">
                    <h1 className="Header an">ADD BOOK</h1>
                    <div>
                <Input 
                    inputSize="inputSmall"
                    type="text" 
                    placeholder='ISBN'
                    maxlength = '13'
                    value={this.state.ISBN}
                    changed={e => this.setState({ISBN:e.target.value})}
                    />
                </div>
                <div>
                    <Input 
                        inputSize="inputSmall"
                        type="text"
                        placeholder='Title' 
                        value={this.state.Title}
                        changed={e=>this.setState({Title:e.target.value})} 
                        />
                </div>
                <div>
                    <Input
                        inputSize="inputSmall"
                        type="text" 
                        placeholder='Author' 
                        value={this.state.Author}
                        changed={e => this.setState({ Author: e.target.value })}
                         />
                
                </div>
                <div>
                    <Input
                        inputSize="inputSmall"
                        type="text"
                        placeholder='Publication'
                        value={this.state.Publication}
                        changed={event => this.setState({ Publication: event.target.value })} 
                        />
                </div>
                <div>            
                    <Input
                        inputSize="inputSmall"
                        type="number"
                        placeholder='Barcode' 
                        value={this.state.Barcode}
                        changed={e => this.setState({Barcode: e.target.value })}
                         />
                </div>
                <div>            
                    <Input
                        inputSize="inputSmall"
                        type="number"
                        placeholder='Quantity' 
                        value={this.state.Quantity}
                        changed={e => this.setState({Quantity: e.target.value })}
                         />
                </div>
                       < div className="inputSll">
                        <select value={this.state.Type} onChange={event => this.setState({ Type: event.target.value })}>

                        <option value="TextBook">TextBook</option>
                          <option value="Manual">Manual</option>
                        <option value="Reference">Reference</option>
                        </select>
                  </div>
        
                    <br/>
                    <br/>
                   <button class="button2 button5"onClick={this.onSubmitHandler}>ADD</button>
                </div>
     
                   </div>
                   </div>
                  
            
        );
    }
}

export default Form;