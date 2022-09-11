import React, {useEffect, useState} from 'react';
import StepProgess from './stepProgess';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import '../../styles/createSteps.scss';
import '../../styles/modal.scss';
import '../../styles/wallet.scss';
import Modal from '@mui/material/Modal';
import localStorage from 'localStorage';
import { useSubstrate, useSubstrateState } from '../../context';
import { useNavigate, Link } from 'react-router-dom';

const CreateStep1 = () => {
    const navigate = useNavigate();
    const {setCurrentAccount} = useSubstrate()
    const { keyring, currentAccount } = useSubstrateState();
    const [open, setOpen] = useState(false);
    const [btnText, setBtnText] = useState('Connect Wallet');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    // Get the list of accounts we possess the private key for
    const keyringOptions = keyring.getAccounts().map(account => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase(),
        icon: 'user',
    }))

    const initialAddress =
        keyringOptions.length > 0 ? keyringOptions[0].value : ''

    // Set the initial address
    useEffect(() => {
        // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
        !currentAccount &&
            initialAddress.length > 0 &&
            setCurrentAccount(keyring.getPair(initialAddress))
        if(!currentAccount){
            localStorage.setItem('main-account', JSON.stringify(initialAddress.address))
        }else{
            localStorage.setItem('main-account', JSON.stringify(currentAccount.address))
        }
    }, [currentAccount, setCurrentAccount, keyring, initialAddress])

    const handleChange = addr => {
        setCurrentAccount(keyring.getPair(addr))
        setBtnText('Continue')
    }

    const handleConnect = () => {
        navigate('/create-wallet/step2')
    }

    return(
        <div className="steps">
            <div className="create-wallet-steps">
                <StepProgess step="1"></StepProgess>
                <p className="intro-text">
                    1、Select network on which to create your multisig wallet.The app is currently pointing to
                </p>
                <div className="selected-network">
                    {localStorage.getItem('network')}
                </div>
                <p className="guide-text">
                    2、Please use Polkadot JS Extension.
                </p>
                <div className="extension-btn">
                    {/* <IconPolkadot></IconPolkadot> */}
                    <img src={icon_polkadot}/>
                    Polkadot
                </div>
                <div className="btn-group">
                    {
                        btnText == "Connect Wallet" ?(
                            <div className="btn" onClick={ handleOpen }>
                                {btnText}
                            </div>
                        ) : (
                            <div className="btn" onClick={ handleConnect }>
                                {btnText}
                            </div>
                        )
                    }
                    
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                        <div
                        v-if="showModal"
                        class="modal"
                        role="dialog"
                        >
                            <span class="close" onClick={handleClose}>
                                <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <rect
                                    x="22.3638"
                                    y="11.0503"
                                    width="16"
                                    height="2"
                                    rx="1"
                                    transform="rotate(135 22.3638 11.0503)"
                                    fill="#FF761C"
                                />
                                <rect
                                    x="11.0503"
                                    y="9.63599"
                                    width="16"
                                    height="2"
                                    rx="1"
                                    transform="rotate(45 11.0503 9.63599)"
                                    fill="#FF761C"
                                />
                                </svg>
                            </span>
                            <slot className="content" />
                            <div className="main">
                                <h3>Select an account</h3>
                                <select 
                                    onChange={(dropdown) => {
                                        handleChange(dropdown.target.value)
                                    }}
                                    value={currentAccount ? currentAccount.address : initialAddress}
                                >
                                    <option>Please select a account</option>
                                    {keyringOptions.map((option) => (
                                        <option value = {option.value}>
                                            {option.text}:{option.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Modal>
                    <Link to ='/'>cancel</Link>
                </div>
            </div>
        </div>
    )
}


export default CreateStep1;