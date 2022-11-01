import React, {useEffect, useState} from 'react';
import { useSubstrate, useSubstrateState } from '../../context';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, Link } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../../styles/login.scss';
import avatar from '../../resources/avatar.svg'
import { web3Accounts,web3FromAddress, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import {encodeAddress} from '@polkadot/util-crypto'

import { stringToHex } from "@polkadot/util";
import axios from 'axios';

import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IdentityIcon from '../IdentityIcon';


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

const SignUpCard = () => {
    const {setCurrentAccount} = useSubstrate()
    const { keyring, currentAccount } = useSubstrateState();
    const navigate = useNavigate();
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


    const [checked, setChecked] = useState(false);
    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.checked;
        
        setChecked(value)
    }

    const handleSignMessage = async()  => {
        const message = await axios.get("https://multisig.dorafactory.org/login/", {params: {account: currentAccount.address}}).then((res) => {
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
            const data = {
                "account": currentAccount.address.toString(),
                "signature": signature
            };

            const result = await axios(
                {
                    method: "post",
                    url: 'https://multisig.dorafactory.org/signup/',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    data
                });

            sessionStorage.setItem("token", result.data['token'].toString())
            if(result.data['token']){
                navigate("/create-wallet")
            }
        }
    }


    const handleChange = (addr) => {
        setCurrentAccount(keyring.getPair(addr))
    }

    const handleLogin = () => {
        navigate("/login")
    }

    return(
        <div className="login-card blur-card-bg signup-card">

            <h3>Sign-up</h3>
            <div className="description">Choose linked account </div>
            <FormControl sx={{ m: 1, minWidth: 490 }}  size="small">
                    <Select           
                    labelId="demo-select-small"
                    id="demo-select-small"
                    onChange={(dropdown) => {
                        handleChange(dropdown.target.value)
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
                                        value={option.value}
                                        size={32}
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
            <div>
                <div className="check-input">
                    <input type="checkbox" name="check1" checked={checked} onChange={(e) => handleInputChange(e)}/>
                </div>
                <div className="private-info">
                    <p className='private-info-text'>I have read and agree to the terms of the <a className='private-info-link'>Dorafactory end user agreement.</a></p>
                    <p className='private-info-text'>To see how we use your personal data please see our <a className='private-info-link'>privacy notice.</a></p>
                </div>
            </div>
            <div className={checked?"login-btn-base login-btn-background login-btn-choose":"check-signup-btn"} onClick={checked?(() => handleSignMessage()):null} disabled={!checked}>
                <div className={checked?null:"check-signup-font"}>
                    Sign-up
                </div>
            </div>
            <div className="div-line-word or-line">
                OR
            </div>
            <div className="text-center">Already have an account? Login!</div>
            <div className="login-btn-base login-btn-reverse signUp-btn" onClick={handleLogin}>
                Login
            </div>
        </div>
    )
}


export default SignUpCard;