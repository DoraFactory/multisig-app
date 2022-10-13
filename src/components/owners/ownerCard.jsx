
import '../../styles/owners.scss'
import avatar from '../../resources/avatar.svg'
import copy from '../../resources/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Identicon from '@polkadot/react-identicon';


function OwnerCard () {

    const owners = JSON.parse(localStorage.getItem('multisig-wallet')).owners;
    const showAccount = (str, maxlength = 7) => {
      const length = str.length;
      return str.length > maxlength
        ? str.slice(0, maxlength - 1) + '...' + str.slice(46, length)
        : str;
    };

    return (
      <div class="all-owners">
        <p class="owner-title"> OWNERES / </p>
        <div class="owner-card-list">
          {owners.map((owner) => (
            <div class="owner-card">
              {/* <img class="owner-logo" src={avatar}/> */}
              <Identicon
                  value={owner.account}
                  // size={32}
                  theme={"polkadot"}
                  className="owner-logo"
              />
              <p class="owner-name"> {owner.name} </p>
              <div class="flex-container">
                {/* <div > */}
                <p class="address">
                  {showAccount(owner.account, 7)}
                </p>
                {/* </div> */}
                {/* <div> */}
                  <CopyToClipboard
                      text={owner.account}
                  >
                    <img src={copy}/>
                  </CopyToClipboard>
                {/* </div> */}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    )
  }

export default OwnerCard
