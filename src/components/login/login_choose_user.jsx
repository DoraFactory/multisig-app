import React, {useEffect, useState} from 'react';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import { useNavigate, Link } from 'react-router-dom';

import localStorage from 'localStorage';
import { useSubstrate, useSubstrateState } from '../../context';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../../styles/login.scss';


const LoginUserCard = () => {
    const {setCurrentAccount} = useSubstrate()
    const { keyring, currentAccount } = useSubstrateState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    // Get the list of accounts we possess the private key for
    // const keyringOptions = keyring.getAccounts().map(account => ({
    //     key: account.address,
    //     value: account.address,
    //     text: account.meta.name.toUpperCase(),
    //     icon: 'user',
    // }))
    // const initialAddress =
    //     keyringOptions.length > 0 ? keyringOptions[0].value : ''

    // Set the initial address
    // useEffect(() => {
    //     // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    //     !currentAccount &&
    //         initialAddress.length > 0 &&
    //         setCurrentAccount(keyring.getPair(initialAddress))
    //     if(!currentAccount){
    //         localStorage.setItem('main-account', JSON.stringify(initialAddress.address))
    //     }else{
    //         localStorage.setItem('main-account', JSON.stringify(currentAccount.address))
    //     }
    // }, [currentAccount, setCurrentAccount, keyring, initialAddress])

    const handleChange = (addr) => {
        setCurrentAccount(keyring.getPair(addr))
    }

    return(
        <div className="login-card blur-card-bg">
            <h3>Login</h3>
            <div className="description">Choose linked account </div>
            <FormControl sx={{ m: 1, minWidth: 592 }}  size="small">
                    <Select           
                    labelId="demo-select-small"
                    id="demo-select-small"
                    // value={ownerAddress}
                    // onChange={handleAddressChange}
                    onChange={() => {
                        handleChange()
                    }}
                    value=""
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="" >
                        <em>Please select an account</em>
                    </MenuItem>
                    {/* {keyringOptions.map((option) => (
                        <MenuItem value={option.value}>{option.text}:{option.value}</MenuItem>
                    ))} */}
                    </Select>
                </FormControl>
            <div className="login-btn-base login-btn-background login-btn-choose">
                <div>
                    Login
                </div>
            </div>
            <div className="div-line-word or-line">
                OR
            </div>
            <div className="text-center">Haven’t used Polkassembly before? Sign up!</div>
            <div className="login-btn-base login-btn-reverse signUp-btn">
                <div>
                    Sign-Up
                </div>
            </div>
        </div>
    )
}


export default LoginUserCard;