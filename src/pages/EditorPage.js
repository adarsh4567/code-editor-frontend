import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useLocation,useNavigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';
import logoInner from '../assets/code-sync.png'
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';

const EditorPage = () => {
  const socketRef = useRef(null);   // reference to socket
  const codeRef = useRef(null);     // reference to the code
  const location = useLocation();  // location.state is the data passed from the previous page
  const reactNavigator  = useNavigate();    // navigate to another page
  const {roomId} = useParams();   // get the roomId from the url
  const [client, setClients] = useState([]); // list of clients in the room
  const copyRoomId = async () => {   // copy the roomId to clipboard
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room Id copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy room id');
      console.log(error)
    }
  }
  const leaveRoom = () =>{
    reactNavigator('/');   // navigate to home page
  }
  useEffect(() => {
    const init = async () => { 
      socketRef.current = await initSocket();  // initialize the socket
      socketRef.current.on('connect_error',(err)=>{ handleErrors(err) }); // handle errors
      socketRef.current.on('connect_failed',(err)=>{ handleErrors(err) });

      const handleErrors = (err) => {
        console.log('socket error',err);
        toast.error('Socket error');     // show error message
        reactNavigator('/');       // navigate to home page
      }
      socketRef.current.emit(ACTIONS.JOIN,{    // emit the join event
         roomId,  // roomId from the url
        username:location.state?.username,  // get the username from the location state
      })
      // listen for the joined event
      socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
        if(username !== location.state?.username){  // if the username is not the same as the one in the location state
          toast.success(`${username} joined the room`);  // show success message
            
         } 
         setClients(clients);  // set the clients  
         socketRef.current.emit(ACTIONS.SYNC_CODE,{
          code : codeRef.current,
          socketId
         })
      }
      );
       // Listening for disconnected
       socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }) => {
            toast.success(`${username} left the room.`);
            setClients((prev) => {
                return prev.filter(
                    (client) => client.socketId !== socketId
                );
            });
        }
    );
    }
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
  };
  }, []);
 
  if(!location.state){
    <Navigate to='/'/>  // if the location state is not present, redirect to the home page
  }
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
          <Client key={i.socketId} username={i.username}/>
        ))}
      </div>
     </div>
     <button className='btn copyBtn' onClick={copyRoomId}>COPY ROOM ID</button>
     <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
      </div>
      <div className='editorWrap'>
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=> codeRef.current=code}/>
      </div>
      </div>
    </>
  )
}

export default EditorPage