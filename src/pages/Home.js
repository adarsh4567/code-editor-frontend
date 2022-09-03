import React, { useState } from "react";
import logo from "../assets/code-sync.png";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(); // storing room data
  const [username, setUsername] = useState(); // storing username data
  const createId = (e) => {
    e.preventDefault(); // to avoid refreshing the page
    const id = uuidv4(); // generating random id
    setRoomId(id);
    toast.success("Room created successfully"); // toast message
  };
  const joinRoom = (e) => {
    if (!roomId || !username) {
      toast.error("Please enter room id and username"); // toast message
      return;
    }
    // Redirecting to editor page
    navigate(`/editor/${roomId}`, {
      state: {
        username, // passing data from current page to navigated page
      },
    });
  };

  const onKeyEnter = (e) => {
    if(e.code == 'Enter'){
      joinRoom();
    }
  }
  return (
    <div className="homeWrapper">
      <div className="formWrapper">
        <img className="homePageLogo" src={logo} alt="code-sync" />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          {/* Controlled Input Implemented  */}
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="inputBox"
            placeholder="ROOM ID"
            onKeyUp={onKeyEnter}
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputBox"
            placeholder="USERNAME"
            onKeyUp={onKeyEnter}
          />
          <button onClick={joinRoom} className="btn joinBtn">
            Join
          </button>
          <span className="createInfo">
            If you don't have invite the create
            <a onClick={createId} className="createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built by <a href="https://github.com/adarsh4567">Adarsh Kumar</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
