import React, { useEffect, useRef, useState } from 'react'
import ACTIONS from '../Actions';
import logoInner from '../assets/code-sync.png'
import Client from '../components/Client';
import Editor from '../components/Editor';
import {initSocket} from '../socket'
import { useLocation , useNavigate,Navigate,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const socketRef = useRef(null);  // socketRef is a reference to the socket
  const location = useLocation();  // get the location object
  const reactNavigator = useNavigate();  // get the navigate function
  const {roomId} = useParams();  // get the roomId from the url
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();   // <--- this is where the socket is initialized
      socketRef.current.on('connect_error',(err)=> handleErrors(err));   
      socketRef.current.on('connect_failed',(err)=> handleErrors(err)); 

      const handleErrors = (e)=>{   // <--- this is where the error is handled
         console.log('socket error',e);
         toast.error('Socket connection error');
         reactNavigator('/') //navigate to home page
      }
      socketRef.current.emit(ACTIONS.JOIN,{   // <--- this is where the socket is joined
        roomId,
        username: location.state?.username
      }); 
    }
    init();
  }, []);
  if(!location.state){
    <Navigate to="/" />
  }
  const [client, setClient] = useState([{socketId:1,username:'ram'},{socketId:2,username:'shyam'}]); // <--- this is where the client is set
  return (
    <>
      <div className='mainWrap'>
      <div className='aside'>
     <div className='asideInner'>
      <div className='logo'>
        <img className='logoImage' src={logoInner} alt='logo'/>
      </div>
      <h3>Connected</h3>
      <div className='clientList'>
        {client.map((i) =>(
          <Client key={i.socketId} username={i.username}/>  // <--- this is where the client is rendered
        ))}
      </div>
     </div>
     <button className='btn copyBtn'>COPY ROOM ID</button>
     <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor/>   
      </div>
      </div>
    </>
  )
}

export default EditorPage