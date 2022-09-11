
import '../../styles/owners.scss'
import avatar from '../../resources/avatar.svg'
import copy from '../../resources/copy.svg'


function OwnerCard () {

    const owners = JSON.parse(localStorage.getItem('multisig-wallet')).owners;

    return (
      <div class="all-owners">
        <p class="owner-title"> OWNERES / </p>
        <div class="owner-card-list">
          {owners.map((owner) => (
            <div class="owner-card">
              <img class="owner-logo" src={avatar}/>
              <p> {owner.name} </p>
              <div>
                <p class="address">
                  {owner.account}
                </p>
                <img src={copy}/>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    )
  }

export default OwnerCard
