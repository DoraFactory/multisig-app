
import '../../styles/owners.scss'
import avatar from '../../resources/avatar.svg'
import copy from '../../resources/copy.svg'


function OwnerCard () {
    return (
      <div class="all-owners">
        <p class="owner-title"> OWNERES / </p>
        <div class="owner-card-list">
        <div class="owner-card">
          <img class="owner-logo" src={avatar}/>
          <p> fengfeng </p>
          <div>
          <p class="address" title="5GZN1wfpzTv8geP6GtEKBFoi1pUskey72LAfdsv2hvzAd3QJ">
            5GZN1wfpzTv8geP6GtEKBFoi1pUskey72LAfdsv2hvzAd3QJ
          </p>
        <img src={copy}/>
  
        </div>
        </div>
        </div>
      </div>
    )
  }

export default OwnerCard
