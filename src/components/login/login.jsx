import React, {useEffect, useState} from 'react';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import { useNavigate, Link } from 'react-router-dom';

import '../../styles/login.scss';
import 'antd/es/button/style/index.css';
import polkadot_logo from '../../resources/polkadot-logo.svg'


const LoginCard = () => {
    return(
        <div className="login-card blur-card-bg">
            <h3>Login</h3>
            <div className="description">Welcome back! Login with Web3 wallet.</div>

            <div className="login-btn-base login-btn-reverse login-btn">
                <img src={polkadot_logo}/>
                <div className='first-login-logo'>Login with Polkadot</div>
            </div>
            
            <div className="div-line-word or-line">
                OR
            </div>
            <div className="text-center">Haven’t used Polkassembly before? Sign up!</div>
            <div className="login-btn-base sign-up-btn-reverse signUp-btn">
                <div>
                    Sign-Up
                </div>
            </div>
        </div>
    )
}


export default LoginCard;
