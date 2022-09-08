// import SideMenu from '../components/sideMenu'
import NetworkInfo from '../components/wallet/networkInfo'
import CreateStep1 from '../components/wallet/createStep1'
import '../styles/wallet.scss'

// import TableSingleLine from '../components/table';
// import TransDoc from '../components/assets/transfer-doc';
// import config from "../context/config"

// const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;

function WalletCreations () {
  return (
    <div>
        <NetworkInfo></NetworkInfo>
        <h2>Welcome to Substrate Multisig</h2>
        
        <CreateStep1></CreateStep1>
        {/* <div className="content">
        </div> */}
    </div>
  )
}

export default WalletCreations
