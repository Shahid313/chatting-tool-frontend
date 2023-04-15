import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";

import Axios from 'axios'
import { useEffect } from "react";

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [profile_image, setProfileImage] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const validate = ()=>{
   const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/

    if(username === ""){
      setErrorMessage("Please enter your name");
      return false;
    }

    if(username.length < 4){
      setErrorMessage("The minimum length of username must be 4")
      return false;
    }

    if(username.length > 20){
      setErrorMessage("The maximum length of username is 20")
      return false;
    }
   
    if(password === ""){
      setErrorMessage("Please enter your password");
      return false;
    }

    if(password != confirm_password){
      setErrorMessage("Passwords does not match")
      return false;
    }

    if(password.length < 4){
      setErrorMessage("Password should be atleast 4 characters")
      return false;
    }

    if(password.length > 20){
      setErrorMessage("Password should not be greater than 20 characters")
      return false;
    }

    if(validatePassword.test(password) === false){
      setErrorMessage("A password must inlude atleast one special character only (!#%), one uppercase letter, one lowercase letter and one number")
      return false;
    }

    if(profile_image === ""){
      setErrorMessage("Please enter your profile image");
      return false;
    }
    return true;
  }


  const signup =()=>{
    
    if(!validate()){
      return;
    }

    let formData = new FormData();
    formData.append("username",username);
    formData.append("password",password);
    formData.append("profile_image",profile_image);

    Axios.post("http://localhost:5000/user/signup",formData)
    .then(res=>{
      if(res.data.msg == "User Registered Successfully"){
        navigate('/signin')
      }else{
        alert("Username already exists please try again")
        
      }
    })
    .catch(err=>{
      alert(err.message)
    })
  }

  const is_logged_in = ()=>{
    const storage = localStorage.getItem('user')
    const parse = JSON.parse(storage)

    if(parse != null){
      navigate('/home')

    }
  }

  useEffect(() => {
    is_logged_in()
  },[])

        return (
        <section className="vh-100">
          
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
             
                {/* Name input */}
                <div className="form-outline mb-4">
                  <p style={{color:'red'}}>{errorMessage}</p>
                </div>

                {/* Profile Image input */}
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

                 {/* Name input */}
                 <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form1Example13"
                    onChange={(val)=>setUsername(val.target.value)}

                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    User Name
                  </label>
                </div>


             
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    onChange={(val)=> setPassword(val.target.value)}
                    
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>


                {/* Confirm Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    onChange={(val)=> setConfirmPassword(val.target.value)}
                    
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Confirm Password
                  </label>
                </div>
                
                {/* Submit button */}
                <button onClick={() => signup()} type="submit" className="btn btn-primary btn-lg btn-block">
                  Sign up
                </button>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                <Link to={'/signin'}>Already have any account want to signin?</Link>
               
             
            </div>
          </div>
        </div>
      </section>
        )
}

export default Signup;