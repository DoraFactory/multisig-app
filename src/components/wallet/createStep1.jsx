import React from 'react';
import '../../styles/wallet.scss';
import StepProgess from './stepProgess';
import IconPolkadot from '../icons/iconPolkadot';
import '../../styles/createSteps.scss';
const CreateStep1 = () => {
    return(
        <div className="create-wallet-steps">
            <StepProgess></StepProgess>
            <p className="intro-text">
                1、Select network on which to create your multisig wallet.The app is currently pointing to
            </p>
            <div className="selected-network">
                xxxxx
            </div>
            <p className="guide-text">
                2、Please use Polkadot JS Extension.
            </p>
            <div className="extension-btn">
                <IconPolkadot></IconPolkadot>
                Polkadot
            </div>

        </div>
    )
}


export default CreateStep1;