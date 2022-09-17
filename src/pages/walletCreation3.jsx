// import SideMenu from '../components/sideMenu'
import NetworkInfo from '../components/wallet/networkInfo'
import CreateStep3 from '../components/wallet/createStep3'
import '../styles/wallet.scss'


function WalletCreation3 () {
  return (
    <div>
        <NetworkInfo></NetworkInfo>
        <h2>Welcome to Substrate Multisig</h2>
        <CreateStep3></CreateStep3>
    </div>
  )
}

export default WalletCreation3
