import React, {useEffect, useState} from 'react';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import { useNavigate, Link } from 'react-router-dom';

import '../../styles/login.scss';
import 'antd/es/button/style/index.css';
import polkadot_logo from '../../resources/polkadot-logo.svg'

const LoginCard = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        props.setDefaultPolka()
    }

    const handleSignup = () => {
        navigate("/signup")
    }

    return(
        <div className="login-card blur-card-bg">
            <h3>Login</h3>
            <div className="description">Welcome back! Login with Web3 wallet.</div>

            <div className="login-btn-base login-btn-reverse login-btn first-login-btn" onClick={handleClick}>
                <img className='font-image' src={polkadot_logo}/>
                <div className='first-login-logo'>Login with Polkadot</div>
            </div>
            
            <div className="div-line-word or-line first-line">
                OR
            </div>
            <div className="text-center first-text">Haven’t used Dorafactory Multisig before? Sign up!</div>
            <div className="login-btn-base sign-up-btn-reverse signUp-btn" onClick={handleSignup}>
                    Sign Up
            </div>
        </div>
    )
}


export default LoginCard;
