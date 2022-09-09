import { React, useState } from 'react';
import Icons from '../resources';
import '../styles/home.scss';
import PreCreateWallet from "../components/home/preCreateWallet";
import LoginWallet from "../components/home/loginWallet";
import {SetProviderSocket} from '../context'
const Home = () => {

    const networks = [
        {"name":"DoraFactory", "logo": "logo.svg"},
        {"name":"Polkadot", "logo": "networks/polkadot.png"},
        {"name":"Kusama", "logo": "networks/kusama.png"}
    ];

    const [network, setNetwork] = useState('');

    const handleChange = name =>{
        setNetwork(name)
        SetProviderSocket(name)
    }

    return(
        <div className="content"> 
            <div className="header">
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