import SideMenu from '../components/sideMenu'
import '../styles/owners.scss'
import logo from '../resources/logo.svg'
import OwnerCard from '../components/owners/ownerCard'

function Owners () {
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
      <SideMenu cardName="owners"></SideMenu>
      <OwnerCard></OwnerCard>
    </div>
</div>

  )
}

export default Owners
