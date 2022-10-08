import React, {useEffect, useState} from 'react';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import { useNavigate, Link } from 'react-router-dom';

import localStorage from 'localStorage';
import { useSubstrate, useSubstrateState } from '../../context';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../../styles/login.scss';
import avatar from '../../resources/avatar.svg'
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSignMessage = async(accountM)  => {
        const message =  await axios.get("http://127.0.0.1:8000/login/", {params: {account: "5GZN1wfpzTv8geP6GtEKBFoi1pUskey72LAfdsv2hvzAd3QJ"}}).then((res) => {
            console.log(res)
        });

        console.log("----------------------------");
        console.log("----------------------------");
        console.log(message);
        console.log("----------------------------");
        console.log("----------------------------");
        const extensions = await web3Enable('my cool dapp');
        if (extensions.length === 0) {
            return;
        }
        const allAccounts = await web3Accounts();
        const account = allAccounts[0];
        console.log(allAccounts);
        console.log(account);

        const injector = await web3FromSource(account.meta.source);

        const signRaw = injector?.signer?.signRaw;

        if (!!signRaw) {
            // after making sure that signRaw is defined
            // we can use it to sign our message
            const { signature } = await signRaw({
                address: account.address,
                data: stringToHex(message),
                type: 'bytes'
            });
            console.log(signature);
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
                    // value={ownerAddress}
                    // onChange={handleAddressChange}
                    onChange={() => {
                        handleChange()
                    }}
                    value=""
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    input={<BootstrapInput/>}
                    >
                        
                    <MenuItem value="" >
                        <div class="profile">
                            <Identicon
                                value={"5GZN1wfpzTv8geP6GtEKBFoi1pUskey72LAfdsv2hvzAd3QJ"}
                                size={32}
                                theme={"polkadot"}
                            />
                            <div
                                class="name-info"
                            >
                                <p align='left'>Alice</p>
                                <p>5GZN1wfpzTv8geP6GtEKBFoi1pUskey72LAfdsv2hvzAd3QJ</p>
                            </div>
                        </div>
                    </MenuItem>
                    {/* {keyringOptions.map((option) => (
                        <MenuItem value={option.value}>{option.text}:{option.value}</MenuItem>
                    ))} */}
                    </Select>
                </FormControl>
            <div className="login-btn-base login-btn-background login-btn-choose">
                <div onClick={() => handleSignMessage("5GZN1wfpzTv8geP6GtEKBFoi1pUskey72LAfdsv2hvzAd3QJ")}>
                    Login
                </div>
            </div>
            <div className="div-line-word or-line">
                OR
            </div>
            <div className="text-center">Haven’t used Dorafactory Multisig before? Sign up!</div>
            <div className="login-btn-base login-btn-reverse signUp-btn">
                <div>
                    Sign-Up
                </div>
            </div>
        </div>
    )
}


export default LoginUserCard;