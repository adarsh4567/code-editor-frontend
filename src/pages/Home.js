import React from 'react'
import logo from '../assets/code-sync.png';
const Home = () => {
  return (
    <div className='homeWrapper'>
        <div className='formWrapper'>
            <img src={logo} alt='code-sync'/>
            <h4 className='mainLabel'>Paste invitation ROOM ID</h4>
            <div className='inputGroup'>
                <input type='text' className='inputBox' placeholder='ROOM ID'/>
                <input type='text' className='inputBox' placeholder='USERNAME'/>
                <button className='btn joinBtn'>Join</button>
            </div>
        </div>
    </div>
  )
}

export default Home