// import SideMenu from '../components/sideMenu'
import NetworkInfo from '../components/wallet/networkInfo'
import CreateStep1 from '../components/wallet/createStep1'
import '../styles/wallet.scss'


function WalletCreations () {
  return (
    <div>
        <NetworkInfo></NetworkInfo>
        <h2>Welcome to Substrate Multisig</h2>
        <CreateStep1></CreateStep1>
    </div>
  )
}

export default WalletCreations
