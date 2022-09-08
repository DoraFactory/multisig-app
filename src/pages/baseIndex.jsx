import react from 'react'
import '../styles/baseindex.scss'
import logo from '../resources/logo.svg'
import SideMenu from '../components/sideMenu';
import AssetCards from '../components/assets/assetCards';
import TransactionStatus from '../components/transactions/transactionStatus';
const BaseIndex = () => {
    return (
        <div>
            <div className="header">
                <span>Substrate multisig</span>
                <div className="current-account">
                    <span className="selected-network"></span>
                    <img id="network-logo" src={logo}></img>
                </div>
            </div>

            <div className="content">

                <SideMenu cardName="assets"></SideMenu>
                <AssetCards></AssetCards>

            </div>
        </div>
)}

export default BaseIndex
