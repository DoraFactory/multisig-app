import React from 'react';
import '../../styles/wallet.scss';
import StepProgess from './stepProgess';
// import IconPolkadot from '../icons/iconPolkadot';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import '../../styles/createSteps.scss';
import '../../styles/step1.scss';
import '../../resources/base.scss';

const CreateStep1 = () => {
    return(
        <div className="steps">
            <div className="create-wallet-steps">
                <StepProgess step="1"></StepProgess>
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
                    {/* <IconPolkadot></IconPolkadot> */}
                    <img src={icon_polkadot}/>
                    Polkadot
                </div>
                <div class="btn-group"> 
                {/* TODO: next step and connect wallet. */}
                    <div class="btn">
                            Connect Wallet
                    </div>
                    <a >cancel</a>
                </div>
            </div>
        </div>
    )
}


export default CreateStep1;