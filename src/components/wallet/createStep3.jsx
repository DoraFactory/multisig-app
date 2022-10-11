import React from "react";
import StepProgess from './stepProgess';
import Icons from '../../resources';
import { useNavigate, Link } from 'react-router-dom';
import localStorage from 'localStorage';
import { createKeyMulti, encodeAddress, sortAddresses} from '@polkadot/util-crypto'
import { useSubstrate, useSubstrateState } from '../../context';

import { web3Accounts,web3FromAddress, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { stringToHex } from "@polkadot/util";
import axios from 'axios';

import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Identicon from '@polkadot/react-identicon';

const CreateStep3 = () => {
    const navigate = useNavigate();

    let multisig_wallet =  JSON.parse(localStorage.getItem('multisig-wallet'));
    const owners = multisig_wallet.owners;
    const threshold = multisig_wallet.threshold;
    const wallet_name = multisig_wallet.wallet_name;

    const sub_address_set = owners.map((owner) => owner.account);

    const { keyring, currentAccount } = useSubstrateState();

    const CreateWallet = async() =>{
        // prefix 
        const SS58Prefix = 42
        const multiAddress = createKeyMulti(sub_address_set, threshold);
        const Ss58Address = encodeAddress(multiAddress, SS58Prefix)
        console.log(Ss58Address)
        console.log(multiAddress)
        let multisig = {
            wallet_name: wallet_name,
            accountId: Ss58Address,
            owners: owners,
            threshold: threshold
        }
        localStorage.setItem('multisig-wallet', JSON.stringify(multisig));


        let curr_account = JSON.parse(localStorage.getItem('main-account'));
        let curr_name = keyring.getAddress(curr_account).meta.name;
        console.log('--------------------------1');
        console.log(curr_account)
        console.log(currentAccount)
        console.log(curr_name)
        console.log('--------------------------2');
        
        const data = {
            "wallet": Ss58Address,
            "wallet_name": wallet_name,
            "owner_name": curr_name,
            "extra_info": {"owners": owners},
            "threshold": threshold
        }
        console.log(data);
        console.log('--------------------------3');

        const result = await axios(
            {
                method: "post",
                url: `http://127.0.0.1:8000/wallets/`,
                headers: {
                    'Content-Type': 'application/json',
                    "dorafactory-token": sessionStorage.getItem("token")
                },
                data
            });

        console.log('------------------------------4')

        console.log(result.data)
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
                        <p className="first-red">
                            Name of new multisig
                        </p>
                        <p>{wallet_name}</p>
                    </div>

                    <div className="right-part">
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
                                <img src={Icons.Avatar} />
                                <div className="name-info">
                                    <p>{owner.name}</p>
                                    <p>{owner.account}</p>
                                </div>
                            </div>
                        ))}
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
