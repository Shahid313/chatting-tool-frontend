import Axios from 'axios';
import React,{useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
const ViewUser = () => {
    const [User, setUser] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        Axios.get(`http://localhost:5000/user/profile?user_id=${window.location.pathname.split("/")[2]}`).then((res) => {
            setUser(res.data.user)
        })
    },[])

    const logout=()=>{
        localStorage.removeItem('userInfo')
        navigate("/signin")
    }

        return(
            <div>
                <div className="container bg-light p-5 " style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
            <div style={{display:'flex', alignItems:'center', gap:'2rem'}}>
                <Link style={{textDecoration:'none', fontSize:18}} to={'/home'}>Home</Link>
                <Link style={{textDecoration:'none', fontSize:18}} to={'/profile'}>Profile</Link>
            </div>
                <div style={{display:'flex', alignItems:'center', gap:'2rem'}}>
                <img src={`http://localhost:5000/uploads/${User.profile_image}`} style={{ width:50,height:50, borderRadius:'50%' }}/>
                <button className="btn btn-primary"  data-toggle="modal" data-target="#exampleModal">Settings</button>
                <button onClick={() => logout()} className="btn btn-danger">Logout</button>
                </div>
        </div>

        <br />

                <center>
                    <img src={`http://localhost:5000/uploads/${User.profile_image}`} style={{width:200,height:200,borderRadius:200,marginTop:50}}/>
                    <h1>{User.username}</h1>
                    <Link to={`/chat/${window.location.pathname.split("/")[2]}`} >
                    <button className='btn btn-primary'>Chat</button>


            </Link>
                </center>
            </div>
        )
}

export default ViewUser;