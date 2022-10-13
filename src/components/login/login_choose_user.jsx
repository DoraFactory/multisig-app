import React, {useEffect, useState} from 'react';
import { useSubstrate, useSubstrateState } from '../../context';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../../styles/login.scss';
import { web3FromAddress, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import {encodeAddress} from '@polkadot/util-crypto'

import { stringToHex } from "@polkadot/util";
import axios from 'axios';

import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Identicon from '@polkadot/react-identicon';
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
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #FF761C',
      'border-radius': '4px',
      fontSize: 16,
      margin:-2,
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
    const SS58Prefix = 42;
    
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
            console.log("-----------------------------");
            console.log(data);
            const result = await axios(
                {
                    method: "post",
                    url: 'https://multisig.dorafactory.org/login/',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    data
                });
            console.log(result.data)
            if(result.data['token']){
                sessionStorage.setItem("token", result.data['token'].toString())
                const wallets = await axios.get(`https://multisig.dorafactory.org/wallets/`,{headers: {"dorafactory-token": sessionStorage.getItem("token")}})
                    .then((res) => {
                        // setMultisigs(res.data['detail'])
                        return res.data
                    });
                console.log("---------------------------here1111");
                console.log("---------------------------here1111");
                console.log("---------------------------here1111");
                console.log("---------------------------here1111");
                console.log(wallets);
                console.log(wallets.length);
                console.log(wallets['detail']);
                console.log(wallets['detail'].length);
                console.log(wallets['detail'] == 0 && wallets['code'] == 'ok' )
                if(wallets['detail'].length === 0 && wallets['code'] === 'ok' ) {
                    console.log("----------------------- hello11")
                    console.log("----------------------- hello11")
                    console.log("----------------------- hello11")
                    navigate("/create-wallet")
                } else {
                    localStorage.setItem('owner-multisigs', JSON.stringify(wallets['detail']))

                    let wallet_multisig = {
                        wallet_name: wallets['detail'][0].wallet_name,
                        accountId: wallets['detail'][0].wallet,
                        owners: wallets['detail'][0].extra_info.owners,
                        threshold: wallets['detail'][0].threshold
                    }

                    console.log("---------------------------1222222");
                    console.log(wallet_multisig)
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
                                    <Identicon
                                        value={option.value}
                                        size={32}
                                        theme={"polkadot"}
                                    />
                                    <div
                                        class="name-info"
                                    >
                                        <p align='left'>{option.text}</p>
                                        <p>{option.value}</p>
                                    </div>
                                </div>
                            </MenuItem>
                        ))}
                        {/* {
                            keyringOptions.map((option) => {
                                console.log(option.value)
                            })
                        } */}
                    </Select>
            </FormControl>
            <div className="login-btn-base login-btn-background login-btn-choose" onClick={() => handleSignMessage()}>
                <div>
                    Login
                </div>
                     {/* <Button onClick={handleToggle}>Login</Button>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop> */}
            </div>
            <div className="div-line-word or-line">
                OR
            </div>
            <div className="text-center">Haven't used Dorafactory Multisig before? Sign up!</div>
            <div className="login-btn-base login-btn-reverse signUp-btn">
            <Link to="/signup">
                Sign Up
            </Link>
            </div>
        </div>
    )
}


export default LoginUserCard;