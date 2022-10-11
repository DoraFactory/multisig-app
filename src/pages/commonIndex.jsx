import React from 'react'
import '../styles/baseindex.scss'
import logo from '../resources/logo.svg'
import AssetCards from '../components/assets/assetCards';
import Menu from '../components/menu';
import {encodeAddress} from '@polkadot/util-crypto'

const CommonIndex = () => {
    const SS58Prefix = 128;
    const main_account =  encodeAddress(JSON.parse(localStorage.getItem('main-account')), SS58Prefix);

    return (
        <div className="App">
            <div className="header">
                <span>Substrate multisig</span>
                <div className="current-account">
                    <span className="selected-network">
                        {localStorage.getItem('network')}:
                        {main_account.substring(0,6) + '...' + main_account.substring(42,)}
                    </span>
                    <img id="network-logo" src={logo}></img>
                </div>
            </div>
            <Menu></Menu>
        </div>
)}

export default CommonIndex