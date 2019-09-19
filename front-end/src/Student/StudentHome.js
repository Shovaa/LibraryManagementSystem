import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./StudentHome.css";
import Input from '../components/input/input';

class StudentHome extends Component {
  constructor(props) {
    super();
    this.state = {
      Search: "",
      searchItems: [],
      noticeItems: [],
      commentItems: [],
      searchItem: {},
      Comment:"",
    };
  }

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
        // console.log(res.data);
        this.setState({ searchItems: res.data });
        window.result = res.data;
        console.log(window.result);
      })
      .catch(error => {
        console.log("Error");
      });
      this.props.history.push('/search');

  };
  addComment=(title, isbn,comment)=>{
    console.log("Title and barcode is", title, isbn);
    var data={
        ISBN:isbn,
        Comment:comment,
        Title:title
    }
      axios.post('http://localhost:8081/addComment',data)
      .then(res => {
            console.log(comment);
              console.log(res.data);
              if(res.data=='Comment Added'){
                  alert('Comment added on'+' '+'book'+' '+title);
                  window.location.reload();
              }
          })
          .catch((error) => {
              console.log("Error");
          });
    }
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
    logoutHandler=()=>{
      localStorage.clear();
      this.location.reload();
    }
    getData=()=>{
      axios.get("http://localhost:8081/postnotice")
      .then(res => {
        console.log(res.data);
        this.setState({ noticeItems: res.data });
        
       
      })
      .catch(error => {
        console.log("Error");
      }); 
    }
  componentDidMount(){
    this.getData();
  }
   
  render(){
  
    return (
      <div className="App">
        <br />
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Library Management System</Navbar.Brand>
          <Nav className="mr-auto">
            {/* <Link to='/add-book'>Add</Link> */}
            <NavLink to="/reserve-book">
              {" "}
              <Nav.Link href="#ReserveBook">Reserve Book</Nav.Link>
            </NavLink>
            <NavLink to="/my-profile">
              <Nav.Link href="#myprofile">My Profile</Nav.Link>
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
        {/* <button onClick = {()=>logoutHandler()}>logout</button> */}
        { this.props.history.location.pathname === "/search" && <div className = 'SearchOutput' >
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
                      
              </div>
          {this.state.searchItems.map((item, index) => {
            console.log(item);
            return (
              <div className="search" >
               
                <div>{item.ISBN}</div>
                <div>{item.Title}</div>
                <div>{item.Author}</div>
                <div>{item.Publication}</div>
                <div>{item.Quantity}</div>
                <div>{item.Available_Quantity}</div>
                <div>{item.Type}</div>
               <div> 
                 <Input
                inputSize="inputSmall"
                type="text"
                placeholder='Comment'
                value={this.state.Comment}
                changed={e => this.setState({ Comment: e.target.value })}
            />
            </div>
            <div>
                  <button
                    onClick={() => this.addComment(item.Title, item.ISBN,this.state.Comment)}
                  >
                  Add
                  </button>
                </div>
                
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
        
        <div className="post">
              { this.props.history.location.pathname === "/" && <div className="post">
             {this.state.noticeItems.map((item, index) => {
            console.log(item);
              return(
           <div>
               <div> {item.Subject}</div>
                <div>Notice:{item.Notice}</div>
                </div>
              )})}
            </div>
              }
              </div>
        
    </div>
    )
      }
    }
  export default withRouter(StudentHome);