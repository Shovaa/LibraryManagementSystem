import React, { Component } from 'react';
import Input from '../components/input/input';
import '../App.css';
import axios from 'axios';
//import BarcodeInputs from './DelBarcode';
//import { CLIENT_RENEG_LIMIT } from 'tls';

class Delete extends Component {
    constructor(props) {
        super();
        this.state = {
            barcodes: [],
            ISBN: "",
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
            ISBN: this.state.ISBN,
            Quantity: this.state.Quantity,
            barcodes: this.state.barcodes
        }

        axios.post('http://localhost:8081/deletebooks', data)
            .then(res => {
                console.log(res.data);
                if(res.data=="Record deleted"){
                    alert(this.state.Quantity+' '+ 'Book deleted of ISBN:'+' '+ this.state.ISBN);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log("Error");
            });
        console.log(this.state.Quantity);
        console.log(this.state.barcodes);
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

            <div className="App" >
                <div className="left">
                <h1 className="Header">DELETE BOOK</h1>
                <div>
                    <Input
                        inputSize="inputSmall"
                        type="number"
                        placeholder='ISBN'
                        value={this.state.ISBN}
                        changed={e => this.setState({ ISBN: e.target.value })}
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

                <button class="button5" onClick={() => this.addBarcode(this.state.Quantity)}>Add Barcode</button>
                {barcodeList}
                <br />
                < button class="button2 button5" onClick={this.onSubmitHandler} > DELETE</button >
                </div>
                
       
            </div >

        );
    }
}

export default Delete;