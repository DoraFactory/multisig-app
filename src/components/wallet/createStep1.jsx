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

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { message } from 'antd';
import 'antd/es/message/style/index.css'

const { Option } = Select;

message.config({
    top:100,
    duration:2
})

const success = () => {
  message.success('This is a success message', 3);
};

const error = () => {
  message.error('This is an error message');
};

const warning = () => {
  message.warning('This is a warning message');
};

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

    const handleChange = (addr) => {
        setCurrentAccount(keyring.getPair(addr))
        setBtnText('Continue')
    }

    const handleConnect = () => {
        navigate('/create-wallet/step2')
    }

    const [ownerAddress, setAddress] = React.useState('');

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
                <p className="guide-text">
                    3、Select an account
                </p>
                <FormControl sx={{ m: 1, minWidth: 592 }}  size="small">
                    <Select           
                    labelId="demo-select-small"
                    id="demo-select-small"
                    onChange={(dropdown) => {
                        handleChange(dropdown.target.value)
                    }}
                    value={currentAccount ? currentAccount.address : initialAddress}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" >
                            <em>Please select an account</em>
                        </MenuItem>
                        {keyringOptions.map((option) => (
                            <MenuItem value={option.value}>{option.text}:{option.value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className="btn-group">
                    <div className="btn" onClick={ handleConnect }>
                        Continue
                    </div>
                    <Link to ='/'>cancel</Link>
                </div>
            </div>
        </div>
    )
}

export default CreateStep1;
