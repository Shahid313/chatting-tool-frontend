import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
const MyProfile = () => {
    const [username, setUsername] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [profile_image, setProfile_Image] = useState('')

    let navigate = useNavigate()

        useEffect(() => {
            const storage = localStorage.getItem('userInfo')
            const parse = JSON.parse(storage)
            setUsername(parse.username)
            setProfileImage(parse.profile_image)
            setUserId(parse.id)
        },[])

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


          const updatingImage = () => {
            Axios.get(`http://localhost:5000/user/profile?user_id=${userId}`).then((res) => {
                    localStorage.setItem("userInfo", JSON.stringify({id:res.data.user._id,username:res.data.user.username, profile_image:res.data.user.profile_image}))
            })
          }

        return(
            <div>
                <div className="container bg-light p-5 " style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:50}}>
            <div style={{display:'flex', alignItems:'center', gap:'2rem'}}>
                <Link style={{textDecoration:'none', fontSize:18}} to={'/home'}>Home</Link>
                <Link style={{textDecoration:'none', fontSize:18}} to={'/profile'}>Profile</Link>
            </div>
                <div style={{display:'flex', alignItems:'center', gap:'2rem'}}>
                <img src={`http://localhost:5000/uploads/${profileImage}`} style={{ width:50,height:50, borderRadius:'50%' }}/>
                <button className="btn btn-primary"  data-toggle="modal" data-target="#exampleModal">Settings</button>
                <button onClick={() => logout()} className="btn btn-danger">Logout</button>
                </div>
        </div>

        <br />
                <center>
                    <img src={`http://localhost:5000/uploads/${profileImage}`} style={{width:200,height:200,borderRadius:200,marginTop:50}}/>
                    <h1 style={{marginTop:'1rem'}}>{username}</h1>
                </center>



                {/* Modal */}
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update Profile</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    
                    {/* Username */}
                    <div className="form-outline mb-4">
                      <h2>{username}</h2>
                    </div>

                    <div className="form-outline mb-4">
                  <input
                    type="file"
                    id="form1Example13"
                    onChange={(val)=> setProfile_Image(val.target.files[0])}
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={() => updateProfile()} class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>

            </div>
        )
}

export default MyProfile