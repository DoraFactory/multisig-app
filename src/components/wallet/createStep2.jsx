import React, {useRef, useState, useEffect} from "react";
import StepProgess from './stepProgess';
import Icons from '../../resources';
import '../../styles/createSteps.scss';
import { Link, useNavigate } from 'react-router-dom';
import localStorage from 'localStorage';
import { useSubstrateState} from '../../context';
import {encodeAddress} from '@polkadot/util-crypto'

import { message } from 'antd';
import 'antd/es/message/style/index.css'

message.config({
    top:100,
    duration:2
})

const success = () => {
  message.success('This is a success message', 3);
};

const NoWalletName = () => {
  message.error('No wallet name, please set it');
};

const NoThreshold = () => {
    message.error('No threshold of this multisig wallet, please set it');
};

const InvalidThreshold = () => {
    message.error('This is a invalid threshold, please set a correct threshold');
}


const CreateStep2 = () => {
    const navigate = useNavigate();
    const walletName = useRef();
    const threshold = useRef();
    const { keyring } = useSubstrateState();
    const SS58Prefix = 128;
    const [ multisigAccount, setMultisigAccount ] = useState({
        wallet_name: '',
        accountId: '',
        owners: [],
        threshold: 1,
    });

    const [owners, setOwners] = useState([]);

    let curr_account = JSON.parse(localStorage.getItem('main-account'));
    console.log("---------------------bug -------------------")
    console.log("---------------------bug -------------------")
    console.log("---------------------bug -------------------")
    let curr_name = keyring.getAddress(curr_account).meta.name;
    console.log(curr_account);
    console.log(curr_name);

    useEffect(() => {
        owners.push({
            name: curr_name,
            account: encodeAddress(curr_account, SS58Prefix)
        })
        
        setOwners([...owners.slice(1)]);

        setMultisigAccount(
            {
                wallet_name: walletName.current.value,
                accountId: '',
                owners: owners,
                threshold: threshold.current.value,
            }
        )
    },[])

    const addAccountLink = () => {
        owners.push({
            name: '',
            account: ''
        })
        setOwners([...owners]);
        setMultisigAccount(
            {
                wallet_name: walletName.current.value,
                accountId: '',
                owners: owners,
                threshold: threshold.current.value,
            }
        )
        console.log(multisigAccount)
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        const inputType = event.target.id.split(' ')[0];
        const inputIndex = Number(event.target.id.split(' ')[1]);

        owners.map((owner, index) => {
            if (index === inputIndex) {
                if (inputType === 'name') {
                    owner.name = value
                }
                if (inputType === 'address') {
                    owner.account = encodeAddress(value, SS58Prefix)
                }
            }
        })

        setOwners([...owners]);
    }

    const handleConnect = () => {
        if(walletName.current.value == ''){
            NoWalletName()
            return
        }
        if(threshold.current.value == 0){
            NoThreshold()
            return
        }
        if(!threshold.current.value >= 1 || threshold.current.value > owners.length || threshold.current.value < 0){
            InvalidThreshold()
            return
        }

        let wallet_multisig = {
            wallet_name: walletName.current.value,
            accountId: '',
            owners: owners,
            threshold: Math.abs(threshold.current.value),
        }
        
        localStorage.setItem('multisig-wallet', JSON.stringify(wallet_multisig));

        navigate('/create-wallet/step3')
    }

    const handleDelOwner = (index) => {
        owners.pop();
        setOwners([...owners]);
        console.log(owners)
        setMultisigAccount(
            {
                wallet_name: walletName.current.value,
                accountId: '',
                owners: owners,
                threshold: threshold.current.value,
            }
        )
    }

    return(
        <div className="steps">
        <div className="create-wallet-steps">
            <StepProgess step="2"></StepProgess>
            
            <section>
                1. Name of the new Wallet, The new multisig wallet will only be available on 
                <span className="current-network">{localStorage.getItem('network')} Network</span>
            </section>
            <div className="form-input">
                <input
                    ref = {walletName}
                    className="wallet-name input-base" 
                    type="text"
                    placeholder="my-wallet-name" 
                />
            </div>

            <section>
                2. Your multisig wallet will have one or more owners. Your connected wallet address has been pre-filled as the first owner.
                <div className="address-form">
                    <div className="filled">
                        <div className="address-titles">
                            <div>NAME</div>
                            <div>ADDRESS</div>
                        </div>

                        {
                            owners.map((owner, index) =>(
                                <div className="address-inputs">
                                    <input type="text" id={`name ${index}`} className={index==0?"input-base disabled-input":"input-base"} disabled={index==0?true:false} defaultValue={owner.name} onChange={(e) => handleInputChange(e)}/>
                                    <div className="editable">
                                        <div className="validate-status"></div>
                                        <input type="text" id={`address ${index}`} className={index==0?"input-base disabled-input":"input-base"} disabled={index==0?true:false}  defaultValue = {owner.account} onChange={(e) => handleInputChange(e)}/>
                                    </div>
                                    <img id={index} onClick={index==0?null:(e)=> {
                                        e.persist();
                                        handleDelOwner(index)
                                    }} src={Icons.Delete} className={index==0? "deletion": "deletion visible"}/>
                                </div>
                            ))
                        }
                        <div className="add-link" onClick={ addAccountLink }>
                            + add another owner
                        </div>
                    </div>
                </div>
            </section>

            <section>
                3. Any transaction requires the confirmation of:
                <div className="threshold">
                <input type="number" className="number-input input-base" οnkeypress="value=value.replace('-','')" min="0" ref={threshold}/>
                    <span>out of owner(s)</span>
                </div>
            </section>

            <div className="btn-group">
                <div class="btn" onClick = {handleConnect}>
                    Continue
                </div>
                <Link to='/create-wallet'>cancel</Link>
            </div>
        </div>
        </div>
        
    )
}



export default CreateStep2;