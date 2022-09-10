import React, {useRef, useState, useEffect} from "react";
import StepProgess from './stepProgess';
import Icons from '../../resources';
import '../../styles/createSteps.scss';
import { Link, useNavigate } from 'react-router-dom';
import localStorage from 'localStorage';
import { useSubstrateState} from '../../context';
const CreateStep2 = () => {
    const navigate = useNavigate();
    const walletName = useRef();
    const threshold = useRef();
    const { keyring } = useSubstrateState();
    const [ multisigAccount, setMultisigAccount ] = useState({
        wallet_name: '',
        accountId: '',
        owners: [],
        threshold: 1,
    });

    const [owners, setOwners] = useState([]);

    let curr_account = JSON.parse(localStorage.getItem('main-account'));
    let curr_name = keyring.getAddress(curr_account).meta.name;

    useEffect(() => {
        owners.push({
            name: curr_name,
            account: curr_account
        })
        
        setOwners([...owners.slice(1)]);

        setMultisigAccount(
            {
                wallet_name: '',
                accountId: '',
                owners: owners,
                threshold: 1,
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
                wallet_name: '',
                accountId: '',
                owners: owners,
                threshold: 1,
            }
        )
    }

    const handleConnect = () => {
        //TODO: 需要判断
        setMultisigAccount({
            wallet_name: walletName,
            accountId: '',
            owners: owners,
            threshold: threshold,
        })
        localStorage.setItem('multisig-wallet', multisigAccount);
        console.log(multisigAccount);
        navigate('/create-wallet/step3')
    }

    return(
        <div className="steps">

        <div className="create-wallet-steps">
            <StepProgess step="2"></StepProgess>
            
            <section>
                1. Name of the new Wallet, The new multisig wallet will only be available on 
                <span className="current-network">{localStorage.getItem('network')} </span>
                network
            </section>
            <div className="form-input">
                <input
                    ref = {walletName}
                    className="wallet-name" 
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
                                {console.log(owner)}
                                {console.log(index)}

                                    <input type="text" disabled={index===0?true:false} value={owner.name}/>
                                    <div className="editable">
                                        <div className="validate-status"></div>
                                        <input type="text" disabled={index===0?true:false}  value = {owner.account} />
                                    </div>
                                    <img src={Icons.Delete} className={index===0? "deletion": "deletion visible"}/>
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
                    <input type="number"  ref={threshold}/>
                    <span>out of owner(s)</span>
                </div>
            </section>

            <div className="btn-group">
                <div class="btn" onClick = {handleConnect}>
                    Continue
                </div>
                <Link to='/create-wallet'> cancel</Link>
            </div>
        </div>
        </div>
        
    )
}



export default CreateStep2;