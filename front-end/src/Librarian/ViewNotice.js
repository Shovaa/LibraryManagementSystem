import React, { Component } from 'react'
import axios from 'axios';
import './Homepage.css';

 class View extends Component {
    constructor(props) {
        super();
        this.state = {
         
          noticeItems: [],
          date:new Date()
        };
    }
    onChange = date => this.setState({ date }) 
   Deletehandler  = (subject,notice) => {
     
        var data = {
          Subject:subject,
         Notice:notice
        };
    
        axios
          .post("http://localhost:8081/deletepost", data)
          .then(res => {
            console.log(res.data);
            if(res.data=='Post Deleted'){
              alert('Post Deleted');
              window.location.reload();
            }
          })
          .catch(error => {
            console.log("Error");
          });
      };
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


    render() {
        


        return (
            <div className="post">
              { this.props.history.location.pathname === "/view-notice" && <div className="post">
             {this.state.noticeItems.map((item, index) => {
            console.log(item);
              return(
              <div className = "postUnit">
               <div className = "subject"><div>{item.Subject}
               </div></div>
                <div className = "notice">Notice:{item.Notice}</div>
            
               <div><button   onClick={() => this.Deletehandler(item.Subject, item.Notice)}>DELETE</button></div>
               </div> 
              )
                   })
             
           
        
    }
    </div>
    }
      
       
     </div>
        )
}
}

export default View;