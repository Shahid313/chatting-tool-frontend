import React from 'react'
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link
  } from "react-router-dom";
  import Axios from 'axios'
const User = ({user}) => {
   
        return (
        <div>
            <div className="container bg-white text-white p-3 mt-2" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>


            <Link to={`/user/${user._id}`} style={{display:'flex',flexDirection:'row'}}>
            <img src={`http://localhost:5000/uploads/${user.profile_image}`} style={{ width:50,height:50, borderRadius:'50%' }}/>
            <h4 style={{marginTop:10,marginLeft:10}}>{user.username}</h4>
            </Link>

            <a href={`/chat/${user._id}`} >
            <button className='btn btn-primary'>Chat</button>


            </a>
        </div>

        </div>
        )
}

export default User