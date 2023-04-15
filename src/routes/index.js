import React from "react";
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link,
    redirect
  } from "react-router-dom";
import ViewUser from "../components/view_user";
import Loggedin from "../pages/auth/loggedin";
import Signin from "../pages/auth/sign_in";
import Signup from "../pages/auth/sign_up";
import Home from "../pages/main/channels";
import Chat from "../pages/main/channels/chat";
import MyProfile from "../pages/auth/MyProfile";


export default class Routes extends React.Component {



    render(){
     

        return <Router>
              <Switch>
                <Route exact path="/"  element={<Loggedin />}/>
                <Route exact path='/home' element={<Home />}/>
                <Route exact path='/chat/:id' element={<Chat />}/>
                <Route exact path='/user/:id' element={<ViewUser />}/>
                <Route exact path='/profile' element={<MyProfile />}/>

                <Route exact path='/signin' element={<Signin />}/>
                <Route exact path='/signup' element={<Signup />}/>

            

      
              </Switch>
            </Router>
    }
  

}