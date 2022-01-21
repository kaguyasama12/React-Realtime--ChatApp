import './Login.css';
import React, { Component, useState, useEffect } from 'react';
import './Create.css';
import io from 'socket.io-client';
import { useLocation, Link} from 'react-router-dom';
import queryString from 'query-string';


let socket;

const Create = ({ location }) => {

    const { username } = queryString.parse(location.search);
    console.log(username)
    const [roomName, setRoomName] = useState('');
    const [roomPass, setRoomPass] = useState('');
    const ENDPOINT = 'localhost:5000';
    


  
    const createRoomButton = (data) => {
        socket = io(ENDPOINT);
        socket.emit('room', { roomName, roomPass}, () => {

        });
        
    }
   
    



    return (
        <div class="frame">
            <div class="option">
                <div class="opt-1">
                    <form>
                        <label>Room Name</label>
                        <input 
                            type="text" 
            
                            value={roomName}  
                            onChange={(e) => setRoomName(e.target.value)}         
                        /> 
                    </form>
                            
                </div>
                <div class="opt-2">
                    <label>Room Password</label>
                    <input 
                        type="text" 
                    
                        value = {roomPass}
                        onChange = {(e) => setRoomPass(e.target.value)}    
                       
                    />
                </div>
            </div>
            <div>
           

            </div>

            <div class="back">
                <Link to ={`/chat?name=${username}&room=${roomName}`}>
                    <button class="go-back" onClick={createRoomButton}>
                        Create
                    </button>
                </Link>
            </div>
        </div>


    );

}
export default Create;