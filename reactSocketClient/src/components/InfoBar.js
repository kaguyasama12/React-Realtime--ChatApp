import React from 'react';

import chatIcon from '../icons/chatIcon.png';


import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={chatIcon} alt="chat icon" />
      <h3>{room}</h3>
    </div>
  </div>
);

export default InfoBar;