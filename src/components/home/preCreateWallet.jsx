import React from "react";
import '../../styles/wallet.scss';

const PreCreateWallet = () => {
    return(
        <div className="create-wallet-main blur-card-bg">
            <h3>Create a wallet</h3>
            <div className="description">
                Substrate multisig is a frontend product of the multisig pallet developed by Parity.io
            </div>
            <div className="btn">
                + Create new wallet   
            </div>
        </div>
    )
}

export default PreCreateWallet;