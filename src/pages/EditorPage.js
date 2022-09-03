import React, { useEffect, useRef, useState } from 'react'
import logoInner from '../assets/code-sync.png'
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {
  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
    }
    init();
  }, []);
  const [client, setClient] = useState([{socketId:1,username:'ram'},{socketId:2,username:'shyam'}]);
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