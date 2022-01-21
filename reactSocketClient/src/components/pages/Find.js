import './Login.css';
import React, { Component, useState, useEffect } from 'react';
import './Create.css';
import io from 'socket.io-client';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';


let socket;

const Find = ({ location }) => {

    const history = useHistory();

    const { username } = queryString.parse(location.search);
    console.log(username)
    const [ nameBool , setNameBool] = useState(true);
    const [ passBool, setPassBool] = useState(true);
    const [roomName, setRoomName] = useState('');
    const [roomPass, setRoomPass] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        

    }, [nameBool, passBool])
    


  
    const createRoomButton = (data) => {
        socket = io(ENDPOINT);
        socket.emit('find', { roomName, roomPass, username }, ({name, pass, canEnter}) => {
            setNameBool(name);
            setPassBool(pass);
            console.log("diatas itu bool");
            if (canEnter) {
                history.push(`/chat?name=${username}&room=${roomName}`);
            }

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
                        {
                            nameBool ?

                                <div></div>
                                :
                                <p> This room does not exists</p>
                        }

                    </form>
                            
                </div>
                <div class="opt-2">
                    <label>Room Password</label>
                    <input 
                        type="text"        
                        value = {roomPass}
                        onChange = {(e) => setRoomPass(e.target.value)}         
                    />
                    {
                        passBool ?
                        <div></div>
                        :
                        <p> You entered the wrong password </p>
                    }
                </div>
            </div>
          

            <div class="back">
                {/* <Link to ={`/chat?name=${username}&room=${roomName}`}> */}
                    <button class="go-back" onClick={createRoomButton}>
                        Join
                    </button>
                {/* </Link> */}
            
            </div>
        </div>


    );

}
export default Find;