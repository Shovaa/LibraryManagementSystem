import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";



import "./Homepage.css";

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      Search: "",
      searchItems: [],
      searchItem: {},
      commentItems: [],
      date: new Date(),
    };
  }
  onChange = date => this.setState({ date })
  onSubmitHandler = event => {
    // <NavLink to='/Search'> </NavLink>
    var data = {
      search: this.state.Search
    };
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
      this.props.history.push('/search');

      console.log(this.props.history.location);

  };
  viewComment=(title, isbn)=>{
    axios
      .get("http://localhost:8081/viewComment", {
        params: {
          ISBN: isbn
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ commentItems: res.data });
      })
      .catch(error => {
        console.log("Error");
      });

  };
  logut=(e)=>{
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <br />
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Library Management System</Navbar.Brand>
          <Nav className="mr-auto">
         
            <NavLink to="/student">
              <Nav.Link href="#student">Issue</Nav.Link>
            </NavLink>
            <NavLink to="/return-book">
              <Nav.Link href="#returnbook">Return</Nav.Link>
            </NavLink>
            <NavLink to="/student-profile">
              <Nav.Link href="#studentprofile">Student Profile</Nav.Link>
            </NavLink>
            <NavLink to="/view-notice">
              <Nav.Link href="#viewnotice">View Notice</Nav.Link>
            </NavLink>
            <NavLink to="/reserved-books">
              <Nav.Link href="#reservedbooks">Reserved Books</Nav.Link>
            </NavLink>
            <NavLink to="/profile">
              <Nav.Link href="#profile">Profile</Nav.Link>
            </NavLink>
            
          </Nav>
          <Form inline>
            <FormControl
              placeholder="Search"
              value={this.state.Search}
              onChange={e => this.setState({ Search: e.target.value })}
              className="mr_sm-2"
            />
            <Button variant="outline-light" onClick={this.onSubmitHandler}>
              Search
            </Button>
          </Form>
        </Navbar>

       
        <div><button onClick={this.logut}>Logout</button></div>
        { this.props.history.location.pathname === "/search" && <div className = 'SearchOutput' >
              <div className="searchhead search" >
                      <div>SN</div>
                      <div>ISBN</div>
                      <div>Title</div>
                      <div>Author</div>
                      <div>Publication</div>
                      <div>Quantity</div>
                      <div>Available Quantity</div>
                      <div>Type</div>
              </div>
          {this.state.searchItems.map((item, index) => {
            console.log(item);
            return (
              <div className="search" >
                <div>{item.SN}</div>
                <div>{item.ISBN}</div>
                <div>{item.Title}</div>
                <div>{item.Author}</div>
                <div>{item.Publication}</div>
                <div>{item.Quantity}</div>
                <div>{item.Available_Quantity}</div>
                <div>{item.Type}</div>
            
               <div><button 
               onClick={() => this.viewComment(item.Title, item.ISBN)}>
                 View Comment</button></div>
                 </div>
            );
          })}
        </div>}
        { this.props.history.location.pathname === "/search" && <div className = 'SearchOutput' >
      
      {this.state.commentItems.map((item, index) => {
        console.log(item);
        return (
          <div className="comment" >
           
            <div>Rollno:{item.Rollno}</div>
           <div>Title:{item.Title}</div>
            <div>{item.Comments}</div>
  </div>
        )
      })}
      </div>
    }
      </div>
    );
  }
}
export default withRouter(Home);