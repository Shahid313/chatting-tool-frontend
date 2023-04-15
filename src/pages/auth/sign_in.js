import React,{useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
import Axios from 'axios'

const Signin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()

  const login = ()=>{
    let formData = new FormData()
    formData.append("username",username)
    formData.append("password",password)

    Axios.post("http://localhost:5000/user/signin",formData)
    .then(res=>{
      if(res.data.msg == "logged in Succesfully"){
        localStorage.setItem("userInfo", JSON.stringify({id:res.data.user._id,username:res.data.user.username, profile_image:res.data.user.profile_image}))
        navigate('/profile')
      }else{
        alert("Username or password is incorrect")
        
      }
    })
    .catch(err=>{
      alert(err.message)
    })

  }

  const is_logged_in = ()=>{
    const storage = localStorage.getItem('userInfo')
    const parse = JSON.parse(storage)
    console.log(storage)

    if(parse != null){
      navigate('/home')

    }
  }

  useEffect(() => {
    is_logged_in()
  },[])

     return (
     <>
         
         <section className="vh-100" id="auth_form">
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
             
                {/* Username input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    onChange={(val)=>setUsername(val.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                   User name
                  </label>
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    onChange={(val)=>setPassword(val.target.value)}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>
                
                {/* Submit button */}
                <button type="submit" onClick={() => login()} className="btn btn-primary btn-lg btn-block">
                  Sign in
                </button>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                <Link to={'/signup'}>Dont have any account want to signup?</Link>
               
              
            </div>
          </div>
        </div>
      </section>
      </>
      
    )
}

export default Signin