import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';

const storage = localStorage.getItem('userInfo')
const parse = JSON.parse(storage)

export default function Message({message,fetchData}){
  const [is_liked,setIsLiked] = useState(false)

  const deleteMessage = () => {
    Axios.get(`http://localhost:5000/message/deleteMessage?message_id=${message._id}`).then(res => {
      console.log(res.data.msg)
      if(res.data.msg === 'Deleted'){
        console.log('Deleted')
      }else{
        alert("Something went wrong")
      }
      fetchData()
    })
  }

  const likeUnlikeMessage = () => {
    let formData = new FormData();
    formData.append("message_id",message._id);
    formData.append("liked_by_id",parse.id);

    Axios.post("http://localhost:5000/message/like",formData)
    .then(res=>{
      if(res.data.msg == "Liked successfully"){
        setIsLiked(true)
      }else if(res.data.msg == "Unliked successfully"){
        setIsLiked(false)
      }else{
        alert("Something went wrong")
      }

      fetchData()
      
    })
    .catch(err=>{ 
      alert(err.message)
    })
  }

    
   useEffect(() => {
    message.likes.map((like) => {
      if(like.liked_by_id === parse.id){
          setIsLiked(true)
      }
    })
   },[])

   
    return <li className={`message ${message.sender_id === parse.id ? `right`:`left`} `}>
            
    <div className="text_wrapper">
    
    {message.sender_id === parse.id ?
    <div className="avatar" >
    <Link to={`/user/${parse.id}`}>
    <img src={`http://localhost:5000/uploads/${parse.profile_image}`} style={{width:'100%',height:60,borderRadius:'50%'}}/>
    </Link>
    </div>:
    <div className="avatar">
    <Link to={`/user/${message.reciever[0]._id}`}>
    <img src={`http://localhost:5000/uploads/${message.reciever[0].profile_image}`} style={{width:'100%',height:60,borderRadius:'50%'}}/>
    </Link>
    </div>}

      <div className="text mt-3" >
      {message.sender_id != parse.id ?
      <Link to={`/user/${message.reciever[0]._id}`}>
         
      &nbsp;<b style={{color:'black'}}>{message.reciever[0].username}</b>
      
      </Link>:
      <Link to={`/user/${parse.id}`}>
         
      &nbsp;<b style={{color:'black'}}>Me</b>
      
      </Link>}

        <br />
           <p>{message.content}</p>
        </div>


        <br />
      <button onClick={() => deleteMessage()} className='btn btn-danger float-right'>Delete</button>


        <div style={{float:'right',marginTop:5, cursor:'pointer'}}>
        <i className="fa fa-thumbs-up" onClick={() => likeUnlikeMessage()} style={{fontSize:20,marginRight:10,color:is_liked?'blue':'black'}}>({message.likes.length})</i>
        </div>
        

      <div style={{marginTop:10}}>
       <p>{message.date}</p>
       </div>
      
    </div>
  </li>
}