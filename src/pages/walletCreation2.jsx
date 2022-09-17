// import SideMenu from '../components/sideMenu'
import NetworkInfo from '../components/wallet/networkInfo'
import CreateStep2 from '../components/wallet/createStep2'
import '../styles/wallet.scss'

function WalletCreation2 () {
  return (
    <div>
        <NetworkInfo></NetworkInfo>
        <h2>Welcome to Substrate Multisig</h2>
        <CreateStep2></CreateStep2>
    </div>
  )
}

export default WalletCreation2
