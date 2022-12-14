import React, {useEffect, useState} from 'react';
import { useSubstrate, useSubstrateState } from '../../context';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../../styles/login.scss';
import { web3FromAddress, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import {encodeAddress} from '@polkadot/util-crypto';
import IdentityIcon from '../IdentityIcon';
import { stringToHex } from "@polkadot/util";
import axios from 'axios';

import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      display: 'flex',
      'justify-content': 'flex-start',
      cursor: 'pointer',
      position: 'relative',
      border: '1px solid #FF761C',
      'border-radius': '4px',
      fontSize: 16,
      'margin-left': '-5px', 
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#FF761C',
        boxShadow: '0 0 0 0.2rem rgba(255, 118, 28, 0.1)',
      },
    },
  }));

const LoginUserCard = () => {
    const {setCurrentAccount} = useSubstrate()
    const { keyring, currentAccount } = useSubstrateState();
    const SS58Prefix = 128;
    
    let keyringOptions = [];
    let initialAddress = '';
    if(keyring){
        keyringOptions = keyring.getAccounts().map(account => ({
            key: encodeAddress(account.address, SS58Prefix),
            value: encodeAddress(account.address, SS58Prefix),
            text: account.meta.name.toUpperCase(),
            icon: 'user',
        }))
        initialAddress = keyringOptions.length > 0 ? keyringOptions[0].value : ''
    }

    const navigate = useNavigate();

    const handleSignMessage = async()  => {
        const message = await axios.get("https://multisig.dorafactory.org/login/", {params: {account: currentAccount.address.toString()}}).then((res) => {
            return res.data
        });

        const injector = await web3FromAddress(currentAccount.address);

        const signRaw = injector?.signer?.signRaw;

        if (signRaw) {
            // after making sure that signRaw is defined
            // we can use it to sign our message
            const { signature } = await signRaw({
                address: currentAccount.address,
                data: stringToHex(message['message'].toString()),
                type: 'bytes'
            });
            localStorage.setItem('main-account', JSON.stringify(currentAccount.address))
            const data = {
                "account": currentAccount.address.toString(),
                "signature": signature
            };
            const result = await axios(
                {
                    method: "post",
                    url: 'https://multisig.dorafactory.org/login/',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    data
                });
            if(result.data['token']){
                sessionStorage.setItem("token", result.data['token'].toString())
                const wallets = await axios.get(`https://multisig.dorafactory.org/wallets/`,{headers: {"dorafactory-token": sessionStorage.getItem("token")}})
                    .then((res) => {
                        return res.data
                    });
                if(wallets['detail'].length === 0 && wallets['code'] === 'ok' ) {
                    navigate("/create-wallet")
                } else {
                    localStorage.setItem('owner-multisigs', JSON.stringify(wallets['detail']))

                    let wallet_multisig = {
                        wallet_name: wallets['detail'][0].wallet_name,
                        accountId: wallets['detail'][0].wallet,
                        owners: wallets['detail'][0].extra_info.owners,
                        threshold: wallets['detail'][0].threshold
                    }

                    localStorage.setItem('multisig-wallet', JSON.stringify(wallet_multisig));
                    navigate("/accountInfo")
                }
            } else {
                navigate("/signup")
            }
        }
    }

    const handleChange = (addr) => {
        setCurrentAccount(keyring.getPair(addr))
    }
    
    const handleSignup = () => {
        navigate("/signup")
    }

    return(
        <div className="login-card blur-card-bg">
            <h3>Login</h3>
            <div className="description">Choose linked account </div>
            <FormControl sx={{ m: 1, minWidth: 490 }}  size="small">
                    <Select           
                    labelId="demo-select-small"
                    id="demo-select-small"
                    onChange={(dropdown) => {
                        handleChange(dropdown.target.value);
                    }}
                    value={currentAccount ? encodeAddress(currentAccount.address, SS58Prefix) : initialAddress}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    input={<BootstrapInput/>}
                    >
                        {keyringOptions.map((option) => (
                            <MenuItem value={option.value}>
                                <div class="profile">
                                    <IdentityIcon
                                        size={32}
                                        value={option.value}
                                    />
                                    <div
                                        class="name-info"
                                    >
                                        <p align='left'>{option.text}</p>
                                        <p>{encodeAddress(option.value, SS58Prefix).substring(0,20) + '......' + encodeAddress(option.value, SS58Prefix).substring(30,)}</p>
                                    </div>
                                </div>
                            </MenuItem>
                        ))}

                    </Select>
            </FormControl>
            <div className="login-btn-base login-btn-background login-btn-choose" onClick={() => handleSignMessage()}>
                <div>
                    Login
                </div>
            </div>
            <div className="div-line-word or-line">
                OR
            </div>
            <div className="text-center">Haven't used Dorafactory Multisig before? Sign up!</div>
            <div className="login-btn-base login-btn-reverse signUp-btn" onClick={handleSignup}>
                Sign Up
            </div>
        </div>
    )
}


export default LoginUserCard;