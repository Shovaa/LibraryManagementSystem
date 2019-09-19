import React, { Component } from 'react';
import Input from '../components/input/input';
import '../App.css';
import axios from 'axios';
//import BarcodeInputs from './DelBarcode';
//import { CLIENT_RENEG_LIMIT } from 'tls';

class Issue extends Component {
    constructor(props) {
        super();
        this.state = {
            barcodes: [],
            Rollno: "",
            Quantity: 0,
            Barcode: "",
            barNos: 0,
            date:new Date()
        };
    }
    addBarcode = (qty) => {
        this.setState({
            barNos: qty
        });
    }
    onSubmitHandler = (event) => {
        var data = {
            Rollno: this.state.Rollno,
            Quantity: this.state.Quantity,
            barcodes: this.state.barcodes
        }
        var rol=/[0-9][0-9][0-9][Bb][CEMGAcemga][TELXIMtelxim][0-9][0-9][0-9]/;
        if(rol.test(this.state.Rollno)==false){
     alert('Rollno in format 073BCT604 i.e YearFacultyRoll');
        }
        else{
        axios.post('http://localhost:8081/issuebooks', data)
            .then(res => {
                console.log(res.data);
                if(res.data=='Book issued'){
                    this.props.history.push('/issue-book')
                    window.location.reload();
                    alert('Book issued in rollno ' + this.state.Rollno);
                 //   this.props.history.push('/issue-book');
                   // window.location.relaod();
                   
                }
                   else {
                    this.props.history.push('/issue-book');
                    window.location.reload();
                        alert('More than 7 books are not available');
                     
                    }
                }
            )
            .catch((error) => {
                console.log("Error");
            });
    }
}

    handleCodeChange = (codeValue, counter) => {
        let codes = this.state.barcodes;
        codes[counter] = codeValue;
        this.setState({
            barcodes: codes
        })

        console.log("Barcode lists are:", this.state.barcodes);
        
    }
    onChange = date => this.setState({ date }) 

    render() {
        let barcodeList = [], codes = [];

        const { barNos } = this.state;
        for (let counter = 0; counter < barNos; counter++) {


            barcodeList.push(


                <div key={counter}>
                    <label htmlFor={counter}>{`Barcode ${counter+1}`}</label>
                    <Input
                        type="number"
                        name={counter}
                        data-id={counter}
                        id={counter}
                        value = ''
                        inputSize="inputSmall"
                        changed = { (e) => this.handleCodeChange(e.target.value, counter)}
                    />

                </div>
            );
        }


        return (
              

            <div className="App left" >
                <h1 className="Header">ISSUE BOOK</h1>
                <div>
                    <Input
                        inputSize="inputSmall"
                        type="text"
                        placeholder='Rollno'
                        value={this.state.Rollno}
                        changed={e => this.setState({ Rollno: e.target.value })}
                    />
                </div>
                <div>
                    <Input
                        inputSize="inputSmall"
                        type="number"
                        placeholder='Quantity'
                        value={this.state.Quantity}
                        changed={e => this.setState({ Quantity: e.target.value })}
                    />
                </div>
                <br />

                <button onClick={() => this.addBarcode(this.state.Quantity)}>Add Barcode</button>
                {barcodeList}
                <br />
                < button  class="button5 button2"onClick={this.onSubmitHandler} >ISSUE</button >
                   
            </div >

        );
    }
}

export default Issue;