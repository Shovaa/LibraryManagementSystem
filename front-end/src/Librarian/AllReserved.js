import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Input from "../components/input/input";
import "../Librarian/Homepage.css";
import "./Homepage.css";
class Reserved extends Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
      Reserved: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8081/getreserveddata")

      .then(res => {
        console.log(res.data);
        this.setState({ Reserved: res.data });
      });
  }

  render() {
    return (
      <div>
        <div className="searchhead search">
          <div>Roll</div>
          <div>Title</div>
          <div>ReserveTIme</div>
        </div>

        <div>
          {this.state.Reserved.map((item, index) => {
            console.log(item);
            let vr = new Date(item.Reservetime);
            let date = vr.toString();
            if (item.Confirm) {
              return  (<div></div>);
            } else {
              return (
                <div>
                  <div className="search">
                    <div> {item.Rollno}&nbsp;&nbsp;</div>
                    <div>{item.Title} &nbsp;&nbsp;</div>
                    <div> {date}</div>
                    &nbsp;&nbsp;
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
export default Reserved;