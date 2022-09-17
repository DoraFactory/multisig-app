import React from "react";
import '../../styles/wallet.scss';
import { useNavigate } from 'react-router-dom';

const LoginWallet = () => {
    const navigate = useNavigate();

    const loginExist = () => {
        navigate('accountInfo')
    }

    return(
        <div className="login-wallet-main blur-card-bg">
            <h3>Login to existing wallet</h3>
            <div className="description">
                Already have a multisig wallet or want to access it from a different device? 
                Easily login your wallet using your wallet address.
            </div>
            <div className="btn btn-reverse" onClick = {loginExist}>
                <div>
                    Login to existing wallet  
                </div>
            </div>
        </div>
    )
}

export default LoginWallet;