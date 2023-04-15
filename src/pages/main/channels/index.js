import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { GETHOMEDATA } from '../../../redux/actions';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import Axios from 'axios'

import User from "../../../components/user";

  // Getting user data

  const getData = () => {
    console.log("getting Data")
    try {
      return dispatch => {
        
       Axios.get('http://localhost:5000/user/previewUsers').then(res=>{
        console.log(res)
          dispatch({
            type: GETHOMEDATA,
            payload: res.data.users
          });
        })
        .catch(err=>{
          console.log("Something Went Wrong")
          console.log(err)
        })
       
      };
    } catch (error) {
      // Add custom logic to handle errors
      console.log("error world")
      
      console.log(error);
    }
  }

const Home = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.homeData.data);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [profile_image, setProfileImage] = useState('')
  const [userId, setUserId] = useState('')
  const [userImage, setUserImage] = useState('')

  let navigate = useNavigate()

    const logout=()=>{
        localStorage.removeItem('userInfo')
        navigate("/signin")
    }

    const updateProfile = () => {
      const storage = localStorage.getItem('userInfo')
      const parse = JSON.parse(storage)

      if(profile_image === "" && password === ""){
        alert("Nothing updated")
      }else{
        if(profile_image === ""){
          let formData = new FormData();
          formData.append("user_id",parse.id);
          formData.append("new_password",password);
  
          Axios.post("http://localhost:5000/user/updatePassword",formData)
          .then(res=>{
            if(res.data.msg == "Password updated succesfully"){
              alert('Password updated succesfully')
            }else{
              alert("Something went wrong")
              
            }
          })
          .catch(err=>{
            alert(err.message)
          })
        }

  
        if(password === ""){
          console.log(profile_image)
          let formData = new FormData();
            formData.append("user_id",parse.id);
            formData.append("profile_image",profile_image);
    
            Axios.post("http://localhost:5000/user/updateProfileImage",formData)
            .then(res=>{
              if(res.data.msg == "Profile image updated successfully"){
                updatingImage()
                alert('Profile image updated successfully')
              }else{
                alert("Something went wrong")
                
              }
            })
            .catch(err=>{
              alert(err.message)
            })
        }
      }


    
    
      

    }

    const fetchData = ()=> dispatch(getData()) 

    useEffect(() => {
      fetchData()

      const storage = localStorage.getItem('userInfo')
      const parse = JSON.parse(storage)
      setUserImage(parse.profile_image)
      setUserId(parse.id)
      setUsername(parse.username)
  },[])


  const updatingImage = () => {
    Axios.get(`http://localhost:5000/user/profile?user_id=${userId}`).then((res) => {
            localStorage.setItem("userInfo", JSON.stringify({id:res.data.user._id,username:res.data.user.username, profile_image:res.data.user.profile_image}))
    })
  }

    
        
    return (
    <div>

        <div className="container bg-light p-5 " style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
            <div style={{display:'flex', alignItems:'center', gap:'2rem'}}>
                <Link style={{textDecoration:'none', fontSize:18}} to={'/home'}>Home</Link>
                <Link style={{textDecoration:'none', fontSize:18}} to={'/profile'}>Profile</Link>
            </div>
                <div style={{display:'flex', alignItems:'center', gap:'2rem'}}>
                <img src={`http://localhost:5000/uploads/${userImage}`} style={{ width:50,height:50, borderRadius:'50%' }}/>
                <button className="btn btn-primary"  data-toggle="modal" data-target="#exampleModal">Settings</button>
                <button onClick={() => logout()} className="btn btn-danger">Logout</button>
                </div>
        </div>

        <br />
        
        <h2 className="text-primary container">Users</h2>
        
        {data.map((user,index) => (
          user._id != userId ?
          <User key={index} user={user}/>:
          null
        ))}
        



        
        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Profile</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    
                    {/* Username */}
                    <div className="form-outline mb-4">
                      <h2>{username}</h2>
                    </div>

                    <div className="form-outline mb-4">
                  <input
                    type="file"
                    id="form1Example13"
                    onChange={(val)=> setProfileImage(val.target.files[0])}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Profile Image
                  </label>
                </div>
             
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    onChange={(val)=>setPassword(val.target.value)}
                    
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>
                
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={() => updateProfile()} className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>

        </div>
        )

}

export default Home