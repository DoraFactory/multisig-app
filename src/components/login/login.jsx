import React, {useEffect, useState} from 'react';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import { useNavigate, Link } from 'react-router-dom';

import '../../styles/login.scss';

const LoginCard = () => {

    return(
        <div className="login-card blur-card-bg">
            <h3>Login</h3>
            <div className="description">Welcome back! Login with Web3 wallet.</div>
            <div className="login-btn-base login-btn-reverse login-btn">
                <div>
                    Login with Polkadot
                </div>
            </div>
            <div className="div-line-word"></div>
            <div className="text-center">Haven’t used Polkassembly before? Sign up!</div>
            <div className="login-btn-base login-btn-reverse signUp-btn">
                <div>
                    Sign-Up
                </div>
            </div>
        </div>
    )
}


export default LoginCard;