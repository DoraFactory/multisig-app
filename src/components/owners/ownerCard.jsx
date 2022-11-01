
import '../../styles/owners.scss'
import avatar from '../../resources/avatar.svg'
import copy from '../../resources/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IdentityIcon from '../IdentityIcon';
import { message } from 'antd';
import 'antd/es/message/style/index.css'

message.config({
    top:100,
    duration:2
})

const CopySuccess = () => {
  message.success('Copied', 1);
};

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
        <p class="owner-title"> OWNERS / </p>
        <div class="owner-card-list">
          {owners.map((owner) => (
            <div class="owner-card">
              {/* <img class="owner-logo" src={avatar}/> */}
              <IdentityIcon
                  value={owner.account}
                  size={68}
                  // theme={"robohash"}
                  // className="owner-logo"
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
                    <img className='cursor-pointer' src={copy} onClick={CopySuccess}/>
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
