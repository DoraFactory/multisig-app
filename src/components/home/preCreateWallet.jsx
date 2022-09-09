import React from "react";
import '../../styles/wallet.scss';
import { Link } from 'react-router-dom';

const PreCreateWallet = () => {
    return(
        <div className="create-wallet-main blur-card-bg">
            <h3>Create a wallet</h3>
            <div className="description">
                Substrate multisig is a frontend product of the multisig pallet developed by Parity.io
            </div>
            <Link className="btn"  to="/transactions">
                + Create new wallet
            </Link>
        </div>
    )
}

export default PreCreateWallet;