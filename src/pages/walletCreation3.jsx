// import SideMenu from '../components/sideMenu'
import NetworkInfo from '../components/wallet/networkInfo'
import CreateStep3 from '../components/wallet/createStep3'
import '../styles/wallet.scss'

// import TableSingleLine from '../components/table';
// import TransDoc from '../components/assets/transfer-doc';
// import config from "../context/config"

// const dora_ksm_parachain_explore = config.DORA_KSM_PARACHAIN_EXPLORE;

function WalletCreation3 () {
  return (
    <div>
        <NetworkInfo></NetworkInfo>
        <h2>Welcome to Substrate Multisig</h2>
        
        <CreateStep3></CreateStep3>
        {/* <div className="content">
        </div> */}
    </div>
  )
}

export default WalletCreation3
