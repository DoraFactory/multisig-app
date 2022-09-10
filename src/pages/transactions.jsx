import SideMenu from '../components/sideMenu'
import '../styles/owners.scss'
import logo from '../resources/logo.svg'

import TransactionStatus from '../components/transactions/transactionStatus'

// import TableSingleLine from '../components/table';
// import TransDoc from '../components/assets/transfer-doc';
// import config from "../context/config"

// const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;

function Transactions () {
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
        <SideMenu cardName="transactions"></SideMenu>
        <TransactionStatus></TransactionStatus>
        </div>
    </div>
  )
}

export default Transactions
