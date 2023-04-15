import React, { useEffect, useRef, useState } from "react";
import './chat.css'
import Axios from 'axios'
import Message from "../../../components/message";
import {useDispatch, useSelector} from 'react-redux';
import { GETMESSAGESDATA } from '../../../redux/actions';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
  redirect,
  useNavigate
} from "react-router-dom";


const storage = localStorage.getItem('userInfo')
const parse = JSON.parse(storage)
let user_id = window.location.pathname.split("/")[2]


export default function Chat(){
  const dispatch = useDispatch()
  const data = useSelector(state => state.messagesData.data);
  
  const messagesEndRef =useRef()
   const [message,setMessage] = useState("")
   const [isLoading,setIsLoading] = useState(true)
   let navigate = useNavigate()



   const getMessagesData = (receiver_id) => {
    console.log(receiver_id)
    try {
      return dispatch => {
        
       Axios.get(`http://localhost:5000/message/previewMessages?sender_id=${parse.id}&&receiver_id=${receiver_id}`).then(res=>{
          dispatch({
            type: GETMESSAGESDATA,
            payload: res.data.messages
          });
          setIsLoading(false)
        })
        .catch(err=>{
          console.log("Something Went Wrong")
          console.log(err)
          setIsLoading(false)

        })
       
      };
    } catch (error) {
      // Add custom logic to handle errors
      console.log("error world")
      
      console.log(error);
    }
  }



   const sendMessage = () => {
    if(message.length<1){
      return
    }

    const data = new FormData()
    data.append("content", message)
    data.append("sender_id", parse.id)
    data.append("receiver_id", user_id)

    Axios.post('http://localhost:5000/message/send', data).then((res) => {
      if(res.data.msg == "Message sent successfully"){
        fetchData(user_id)
      } 
    })
    

   }
 
  
  
   const is_loggedin = ()=>{
    if(!localStorage.getItem('userInfo')){
      navigate('/signin')

    }
    }

    const fetchData = (id)=> dispatch(getMessagesData(id)) 

   useEffect(()=>{
    
    fetchData(user_id)


    setInterval(()=>{
      fetchData(user_id)
    
    },10000)
    is_loggedin()
    
   },[])

  
 
        return <>

        <div className="chat_window" >
          <Link style={{textDecoration:'none', padding:5}} to="/home">Back to home</Link>
        
          <div className="top_menu" >


         
            <div className="title">Chat</div>
          </div>
          <ul className="messages" ref={messagesEndRef}>
          
          {isLoading == false?data.map((message,index) => (
            <Message key={index} message={message} fetchData={()=>fetchData(user_id)}/>
          )):<h1>Loading ...</h1>}
          

      


       

            </ul>
          <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
              <input
                onChange={(val)=>setMessage(val.target.value)}
                className="message_input"
                placeholder="Type your message here..."
              />
            </div>
            <div onClick={() => sendMessage()}  className="send_message">
              <div className="icon" />
              <div className="text">Send</div>
            </div>
          </div>
        </div>
       


     
 
      </>
      
    }
