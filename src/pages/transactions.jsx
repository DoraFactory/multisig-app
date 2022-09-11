import SideMenu from '../components/sideMenu'
import '../styles/owners.scss'
import logo from '../resources/logo.svg'

import TransactionStatus from '../components/transactions/transactionStatus'

function Transactions () {
  const multisig_accountId = JSON.parse(localStorage.getItem('multisig-wallet')).accountId;

  return (
    <div>
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

        <div className="content">
        <SideMenu cardName="transactions"></SideMenu>
        <TransactionStatus></TransactionStatus>
        </div>
    </div>
  )
}

export default Transactions
