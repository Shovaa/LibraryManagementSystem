import React ,{Component} from 'react';
import Input from '../components/input/input';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
//import Axios from 'axios';
//import Button from './components/Button/Button';
import axios from 'axios';
class New extends Component{
    constructor(props){
        super();
    this.state ={
        ISBN: "",
        Title: "",
        Author: "",
        Publication: "",
        Barcode: "",
        Quantity:"",
        Type:""
    };
}
onReserveHandler=(e)=>{
    this.props.history.push('/confirm-reserve')

}
onIssueHandler=(e)=>{
    this.props.history.push('/issue-book')
}
render(){
    return(
    <div className="confirmreserve">
        <button onClick={this.onReserveHandler}>Confirm Reserve</button>
        <button onClick={this.onIssueHandler}>Issue</button>
    </div>
    )
}
}
export default New;