import React from "react";
import { Link } from 'react-router-dom';
import '../../styles/wallet.scss';

const PreCreateWallet = () => {
    return(
        <div className="create-wallet-main blur-card-bg">
            <h3>Create a wallet</h3>
            <div className="description">
                Substrate multisig is a frontend product of the multisig pallet developed by Parity.io
            </div>
            <Link className="btn"  to="/create-wallet">
                + Create new wallet
            </Link>
        </div>
    )
}

export default PreCreateWallet;