import React, { useEffect, useRef } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/lib/codemirror.css';
import ACTIONS from '../Actions'

const Editor = ({socketRef,roomId,onCodeChange}) => {
  const editorRef = useRef(null);  // reference to the editor
    useEffect(() => {
      const init =  async ()=>{
        // initialize the editor
         editorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'),{
            mode:{name:'javascript',json:true},
            theme:'dracula',
            autoCloseTags:true,
            autoCloseBrackets:true,
            lineNumbers:true,
         });

         editorRef.current.on('change',(instance,changes)=>{  // listen for changes in the editor
          const {origin} = changes;
          const code = instance.getValue();       // get the value of the editor
           onCodeChange(code);  // call the onCodeChange function
          if(origin !== 'setValue'){              // if the origin is not setValue
            socketRef.current.emit(ACTIONS.CODE_CHANGE,{  // emit the code change event
              roomId,  // roomId from the url
              code     // code from the editor
            });
          }
         })
      }
      init();
    }, [])
    useEffect(() => {
      if(socketRef.current){
        socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{   // listen for the code change event
          if(code !== null){
            editorRef.current.setValue(code);  // set the value of the editor
          }
     })
      }
      return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE);  // remove the listener
      }
    }, [socketRef.current])
  return (
    <textarea id='realtimeEditor'></textarea>
  )
}

export default Editor