import React from 'react'
import '../styles/baseindex.scss'
import logo from '../resources/logo.svg'
import AssetCards from '../components/assets/assetCards';
import Menu from '../components/menu';
const CommonIndex = () => {

    const main_account = JSON.parse(localStorage.getItem('main-account'));

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