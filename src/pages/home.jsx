import { React, useState } from 'react';
import Icons from '../resources';
import '../styles/home.scss';
import PreCreateWallet from "../components/home/preCreateWallet";
import LoginWallet from "../components/home/loginWallet";
import localStorage from 'localStorage';
const Home = () => {

    const networks = [
        {"address": "ws://127.0.0.1:9944", "name":"LocalChain", "logo": "logo.svg"},
        {"address":"wss://rpc.polkadot.io", "name":"Polkadot", "logo": "networks/polkadot.png"},
        {"address":"wss://kusama-rpc.polkadot.io", "name":"Kusama", "logo": "networks/kusama.png"}
    ];

    const [network, setNetwork] = useState('');
    const [isFirst , setIsFirst] = useState(true);

    // store the network
    if(isFirst){
        localStorage.setItem('network', networks[0].name);
    }else{
        localStorage.setItem('network', network);
    }

    const handleChange = name =>{
        setNetwork(name)
        setIsFirst(false)
    }

    return(
        <div className="home-content"> 
            <div className="header-home">
                <select 
                    onChange={(dropdown) => {
                        handleChange(dropdown.target.value)
                    }}
                    value = {network}
                >
                    {networks.map((network) => (
                        <option value = {network.name}>
                                {network.name}
                        </option>
                    ))}
                </select>
                <img src={Icons.Logo}></img>
            </div>
            <h2>Welcome to Substrate Multisig</h2>
            <main>
                <PreCreateWallet />
                <div class="vertical-space-divider" />
                <LoginWallet />
            </main>
        </div>
)}



export default Home;