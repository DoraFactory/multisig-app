import React, {useEffect, useState} from 'react';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import { useNavigate, Link } from 'react-router-dom';

import '../../styles/login.scss';
import 'antd/es/button/style/index.css';
import polkadot_logo from '../../resources/polkadot-logo.svg'

const WithoutExtensionCard = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup")
    }

    return(
        <div className="login-card blur-card-bg">
            <h3>Login</h3>
            <div className="description">Welcome back! Login with Web3 wallet.</div>


            <div className='without-extension-card'>
            <div className='extension-card-text-1'>Polkadot Js extension not detected.</div>
            <div className='extension-card-text-2'>Please install <a className='extension-card-link' href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/">Firefox</a> or <a className='extension-card-link' href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd">Chorme</a> browser to use this feature.</div>
            </div>
            <div className="div-line-word or-line">
                OR
            </div>
            <div className="text-center">Haven’t used Dorafactory Multisig before? Sign up!</div>
            <div className="login-btn-base sign-up-btn-reverse signUp-btn" onClick={handleSignup}>
                    Sign Up
            </div>
        </div>
    )
}

export default WithoutExtensionCard;
