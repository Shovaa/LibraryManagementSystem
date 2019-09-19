import React from 'react';

import './App.css';
import Form from './Librarian/Addbook';
import Delete from './Librarian/Delete';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Librarian/Homepage';
import SuperHome from './Librarian/Superhome';
import Update from './Librarian/Update';
import Search from './Librarian/search';
import Student from './Librarian/Student';
import Reserve from './Student/Reserve';
import StudentHome from './Student/StudentHome';
import Issue from './Librarian/Issue';
import New from './Librarian/NewIssue';
import Profile from './Librarian/StudentProfile';
import Return from './Librarian/Return';
import Post from './Librarian/PostNotice';
import View from './Librarian/ViewNotice';
import Login from './Login';
import Homepage from './Librarian/Homepage';
import UserProfile from './Student/UserProfile';
import AddStudent from './Librarian/AddStudent';
import Password from './Student/ChangePassword';
import axios from 'axios';
import Reserved from './Librarian/AllReserved';
import LProfile from './Librarian/Profile';
function App() {

var user = localStorage.getItem("usertype")
var token = localStorage.getItem("token")
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
 if (user === "student"){
  return (
    <Router>
      <div>
        <StudentHome />

        <Switch>
        <Route path='/home' component={Homepage} />
          <Route path='/add-book' component={Form} />
          <Route path='/delete-book' component={Delete} />
          <Route path='/update-book' component={Update}/>
          <Route path='/student' component={New}/>
          <Route path='/student-profile' component={Profile}/>
          <Route path='/confirm-reserve' component={Student}/>
          {/* <Route path='/search' component={Search}/> */}
          <Route path='/reserve-book' component={Reserve}/>
          <Route path='/issue-book' component={Issue}/>
          <Route path='/return-book' component={Return}/>
          <Route path='/post-notice' component={Post}/>
          <Route path='/student-home' component={StudentHome}/>
          <Route path='/view-notice' component={View}/>
          <Route path='/my-profile' component={UserProfile}/>
          <Route path='/add-student' component={AddStudent}/>
          <Route path='/change-password' component={Password}/>
        </Switch>
        <image src={process.env.PUBLIC_URL+ " lib.jpg"}
        alt ="Mypic"
        width="1200px"
        />
      </div>
    </Router>
  );
 }
 else if (user === "teacher"){
  return (
    <Router>
      <div className="images">
        <Home/>

        <Switch>
        <Route path='/home' component={Homepage} />
          <Route path='/add-book' component={Form} />
          <Route path='/delete-book' component={Delete} />
          <Route path='/update-book' component={Update}/>
          <Route path='/student' component={New}/>
          <Route path='/student-profile' component={Profile}/>
          <Route path='/confirm-reserve' component={Student}/>
          {/* <Route path='/search' component={Search}/> */}
          <Route path='/reserve-book' component={Reserve}/>
          <Route path='/issue-book' component={Issue}/>
          <Route path='/return-book' component={Return}/>
          <Route path='/post-notice' component={Post}/>
          <Route path='/student-home' component={StudentHome}/>
          <Route path='/view-notice' component={View}/>
          <Route path='/add-student' component={AddStudent}/>
          <Route path='/profile' component={LProfile}/>
          <Route path='/reserved-book' component={Reserved}/>
        </Switch>
      </div>
    </Router>
  ); 
 }
 else if (user === "bigteacher"){
  return (
    <Router>
      <div className="an">
        <SuperHome/>

        <Switch>
        <Route path='/home' component={Homepage} />
          <Route path='/add-book' component={Form} />
          <Route path='/delete-book' component={Delete} />
          <Route path='/update-book' component={Update}/>
          <Route path='/student' component={Issue}/>
          <Route path='/student-profile' component={Profile}/>
          <Route path='/confirm-reserve' component={Student}/>
          {/* <Route path='/search' component={Search}/> */}
          <Route path='/reserve-book' component={Reserve}/>
          <Route path='/issue-book' component={Issue}/>
          <Route path='/return-book' component={Return}/>
          <Route path='/post-notice' component={Post}/>
          <Route path='/student-home' component={StudentHome}/>
          <Route path='/view-notice' component={View}/>
          <Route path='/add-student' component={AddStudent}/>
          <Route path='/reserved-books' component={Reserved}/>
          <Route path='/profile' component={LProfile}/>
        </Switch>
      </div>
    </Router>
  ); 
 }
 else {
   return (
     <div className="s">
       <Login/>
     </div>
   )
 }
}

export default  App;