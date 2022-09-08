// import SideMenu from '../components/sideMenu'
import NetworkInfo from '../components/wallet/networkInfo'
import CreateStep2 from '../components/wallet/createStep2'
import '../styles/wallet.scss'

// import TableSingleLine from '../components/table';
// import TransDoc from '../components/assets/transfer-doc';
// import config from "../context/config"

// const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;

function WalletCreation2 () {
  return (
    <div>
        <NetworkInfo></NetworkInfo>
        <h2>Welcome to Substrate Multisig</h2>
        
        <CreateStep2></CreateStep2>
        {/* <div className="content">
        </div> */}
    </div>
  )
}

export default WalletCreation2
