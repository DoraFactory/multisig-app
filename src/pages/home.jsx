import { React, useState } from 'react';
import Icons from '../resources';
import '../styles/home.scss';
import PreCreateWallet from "../components/home/preCreateWallet";
import LoginWallet from "../components/home/loginWallet";
import localStorage from 'localStorage';
import { LoginUserCard, LoginCard, WithoutExtensionCard } from "../components/login";
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

const Home = () => {

    const networks = [
        {"address": "ws://127.0.0.1:9944", "name":"DoraFactory", "logo": "logo.svg"},
        // {"address":"wss://rpc.polkadot.io", "name":"Polkadot", "logo": "networks/polkadot.png"},
        // {"address":"wss://kusama-rpc.polkadot.io", "name":"Kusama", "logo": "networks/kusama.png"}
    ];

    const [network, setNetwork] = useState('');
    const [isFirst , setIsFirst] = useState(true);

    const [isExtension, setIsExtension] = useState(1);
    const [defaultPolka, setDefaultPolka] = useState(1)

    // store the network
    if(isFirst){
        localStorage.setItem('network', networks[0].name);
    }else{
        localStorage.setItem('network', network);
    }

    const handleNetworkChange = name =>{
        setNetwork(name)
        setIsFirst(false)
    }

    const changeDefault = () => {
        setDefaultPolka(0)
        web3Enable("dorafactory multisig app").then((extension) => {
            // no polkadot.js extension
            if (extension.length == 0) {
                setIsExtension(0);
            }
        });
    }

    return(
        <div className="home-content"> 
            <div className="header-home">
                <select disabled
                    onChange={(dropdown) => {
                        handleNetworkChange(dropdown.target.value)
                    }}
                    value = {network}
                >
                    {networks.map((network) => (
                        <option value={network.name}>
                                {network.name}
                        </option>
                    ))}
                </select>
                <img src={Icons.Logo}></img>
            </div>
            <h2>Welcome to Substrate Multisig</h2>

            {defaultPolka ? (
                <LoginCard setDefaultPolka = {changeDefault}></LoginCard>
            ) : null}

            {isExtension && !defaultPolka ? (
                <LoginUserCard></LoginUserCard>
            ) : null}

            { !isExtension &&  !defaultPolka ? (
                <WithoutExtensionCard></WithoutExtensionCard>
            ) : null}

        </div>
)}


export default Home;