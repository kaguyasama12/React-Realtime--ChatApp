import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Link, Router } from 'react-router-dom';    

import { Input } from 'antd';
import 'antd/dist/antd.less';
import './Login.css';
import Header from '../Header';

const { Search } = Input;






export default class Login extends Component {

    state = {
        userName: '',
        isLoggedIn: false,
    }

    render() {
        return (
                <div className="main">
                    
                { this.state.isLoggedIn ?
                    <div class="frame">
                        <div class="title">
                            Start Chatting
                        </div>
                        <div class="option">
                            <div class="opt-1">
                                <i class="ion-compose"></i>
                                Host a Room
                                <hr />
                                <Link 
                                    to = {`/create?username=${this.state.userName}`}
                                >
                                    <button class="create" >
                                        Create Room
                                    </button>
                                </Link>
                            </div>
                            <div class="opt-2">
                                <i class="ion-ios-search"></i>
                                Find Room
                                <hr />
                                <Link to ={`/find?username=${this.state.userName}`}>
                                    <button class="find">
                                        Find Room
                                    </button>  
                                </Link>
                                   
                            </div>
                        </div>

                        <div class="back">
                            <button class="go-back">
                                Back
                            </button>
                        </div>
                    </div>
                : 
                <div>
                    <Header />
                    <div 
                    style={{ padding: '0px 150px '}}
                    >
                        <Search
                            placeholder="Enter Username"
                            enterButton="Login"
                            size="large"
                            onSearch={ value => this.setState({ isLoggedIn: true, userName: value})}
                        />
                    </div>
                </div>
                
                
                
                }
                

                </div>
            
        )
    }
}