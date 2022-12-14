import React from "react";
import StepProgess from './stepProgess';
import Icons from '../../resources';
import { useNavigate, Link } from 'react-router-dom';
import localStorage from 'localStorage';
import { createKeyMulti, encodeAddress } from '@polkadot/util-crypto'
import { useSubstrateState } from '../../context';
import IdentityIcon from '../IdentityIcon';

import axios from 'axios';

const CreateStep3 = () => {
    const navigate = useNavigate();

    let multisig_wallet =  JSON.parse(localStorage.getItem('multisig-wallet'));
    const owners = multisig_wallet.owners;
    const threshold = multisig_wallet.threshold;
    const wallet_name = multisig_wallet.wallet_name;

    const sub_address_set = owners.map((owner) => owner.account);

    const { keyring } = useSubstrateState();
  
    const SS58Prefix = 128;
    const multiAddress = createKeyMulti(sub_address_set, threshold);
    const Ss58Address = encodeAddress(multiAddress, SS58Prefix)

    const CreateWallet = async() =>{
        // prefix 

        let multisig = {
            wallet_name: wallet_name,
            accountId: Ss58Address,
            owners: owners,
            threshold: threshold
        }
        localStorage.setItem('multisig-wallet', JSON.stringify(multisig));

        let curr_account = JSON.parse(localStorage.getItem('main-account'));
        let curr_name = keyring.getAddress(curr_account).meta.name;
        
        const data = {
            "wallet": Ss58Address,
            "wallet_name": wallet_name,
            "owner_name": curr_name,
            "extra_info": {"owners": owners},
            "threshold": threshold
        }

        const result = await axios(
            {
                method: "post",
                url: `https://multisig.dorafactory.org/wallets/`,
                headers: {
                    'Content-Type': 'application/json',
                    "dorafactory-token": sessionStorage.getItem("token")
                },
                data
            });

        const wallets = await axios.get(`https://multisig.dorafactory.org/wallets/`,{headers: {"dorafactory-token": sessionStorage.getItem("token")}})
            .then((res) => {
                return res.data
            });
        localStorage.setItem('owner-multisigs', JSON.stringify(wallets['detail']))
        
        navigate('/accountInfo')
    }

    return(
        <div className="steps">
        <div className="create-wallet-steps">
            <StepProgess step="3"></StepProgess>
            <p>
                Review wallet information
            </p>
            <div className="sunmmary">
                <div className="top">
                    <div className="left-part">
                        <div className="left-card-message">
                            <p className="first-red">
                                NetWork
                            </p>
                            <p>Dorafactory</p>
                        </div>
                        <div>
                            <p className="first-red">
                                JS Extension
                            </p>
                            <p>Polkadot</p>
                        </div>
                        <div>
                            <p className="first-red">
                                Wallet Account
                            </p>
                            <p>{wallet_name}({Ss58Address})</p>
                        </div>

                    </div>

                    <div className="right-part">
                        <div className="left-card-message">
                            <p className="first-red">
                                Name of new multisig
                            </p>
                            <p> {wallet_name} </p>
                        </div>
                        <div className="left-card-message">
                            <p className="first-red">
                                Any transaction requires the confirmation of:
                            </p>
                            <p> {multisig_wallet.owners.length} out of {threshold} owners </p>
                        </div>
                        <div className="owners">
                        <p className="first-red">
                            {multisig_wallet.owners.length} wallet owners
                        </p>
                        {owners.map((owner) => (
                            <div className="profile">   
                                <IdentityIcon
                                    value={owner.account}  
                                    size={32}
                                />
                                <div className="name-info">
                                    <p>{owner.name}</p>
                                    <p>{owner.account}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    
                </div>
            </div>

            <div className="btn-group">
                <div className="btn" onClick={ () => CreateWallet() }>
                    Create Wallet
                </div>
                <Link to="/create-wallet">back</Link>
            </div>
        </div>
        </div>
    )
}

export default CreateStep3;
