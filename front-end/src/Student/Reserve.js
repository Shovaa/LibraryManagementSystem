import React, { Component } from "react";
import Input from "../components/input/input";
import axios from "axios";
import "../App.css";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import "./StudentHome.css";
class Reserve extends Component {
  constructor(props) {
    super();
    this.state = {
      Search: "",
      searchItems: [],
      ReserveTime: "",
      Rollno:""
    };
  }

  onSubmitHandler = event => {
   
   

    console.log(this.state.Search);
    axios
      .get("http://localhost:8081/searchbooks", {
        params: {
          search: this.state.Search
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ searchItems: res.data });
        window.result = res.data;
        console.log(window.result);
      })
      .catch(error => {
        console.log("Error");
      });
    
  };
  onReserveHandler = (title, isbn,roll) => {
    var data = {
      ReserveTime: this.state.ReserveTime,
      Title:title,
      ISBN:isbn,
      Rollno:roll
    };
  
    axios
      .post("http://localhost:8081/reserve", data)
      .then(res => {
        console.log(res.data);
        if(res.data=='Book Issued and Reserved More than 7'){
          alert('Book Issued and Reserved More than 7 or Same Book not Allowed');
          this.props.history.push('/reserve-book');
          window.location.reload();
        }
        else{
          alert('Book reserved');
          window.location.reload();
        }
      })
      .catch(error => {
        console.log("Error");
      });
    
  };
  render() {
    return (
      <div>
        <Input
          inputSize="input"
          placeholder="Search"
          value={this.state.Search}
          changed={e => this.setState({ Search: e.target.value })}
        />
        <button onClick={this.onSubmitHandler}>Search</button>
        <div>
        <div className="searchhead search" >
        
        <div>ISBN</div>
        <div>Title</div>
        <div>Author</div>
        <div>Publication</div>
        <div>Quantity</div>
        <div>Available Quantity</div>
        <div>Type</div>
        <div>Comment</div>
        <div>Add</div>
          {this.state.searchItems.map((item, index) => {
            console.log(item);
            
            return (
              
                  <div className="search an" >
               
                <div >{item.SN}</div>
                <div>{item.ISBN}</div>
                <div>{item.Title}</div>
                <div>{item.Author}</div>
                <div>{item.Publication}</div>
                <div>{item.Quantity}</div>
                <div>{item.Type}</div>
                <div>
                
                </div>
                <div>
                  <button class="button5"
                    onClick={() => this.onReserveHandler(item.Title, item.ISBN)}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}
export default Reserve;