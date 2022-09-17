import React from 'react'
import '../styles/baseindex.scss'
import logo from '../resources/logo.svg'
import AssetCards from '../components/assets/assetCards';
import Menu from '../components/menu';
const CommonIndex = () => {

    const multisig_accountId = JSON.parse(localStorage.getItem('multisig-wallet')).accountId;

    return (
        <div className="App">
            <div className="header">
                <span>Substrate multisig</span>
                <div className="current-account">
                    <span className="selected-network">
                        {localStorage.getItem('network')}:
                        {multisig_accountId.substring(0,6) + '...' + multisig_accountId.substring(42,)}
                    </span>
                    <img id="network-logo" src={logo}></img>
                </div>
            </div>

            {/* <div className="content"> */}

                {/* <SideMenu cardName="assets"></SideMenu>
                <AssetCards></AssetCards> */}
            <Menu></Menu>

            {/* </div> */}
        </div>
)}

export default CommonIndex
