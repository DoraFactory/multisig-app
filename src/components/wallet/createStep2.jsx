import React, {useRef, useState, useEffect} from "react";
import StepProgess from './stepProgess';
import Icons from '../../resources';
import '../../styles/createSteps.scss';
import { Link, useNavigate } from 'react-router-dom';
import localStorage from 'localStorage';
import { useSubstrateState} from '../../context';
const CreateStep2 = () => {
    const navigate = useNavigate();
    const walletName = useRef();
    const threshold = useRef();
    const { keyring } = useSubstrateState();
    const [ multisigAccount, setMultisigAccount ] = useState({
        wallet_name: '',
        accountId: '',
        owners: [],
        threshold: 1,
    });

    const [owners, setOwners] = useState([]);

    let curr_account = JSON.parse(localStorage.getItem('main-account'));
    let curr_name = keyring.getAddress(curr_account).meta.name;

    useEffect(() => {
        owners.push({
            name: curr_name,
            account: curr_account
        })
        
        setOwners([...owners.slice(1)]);

        setMultisigAccount(
            {
                wallet_name: walletName.current.value,
                accountId: '',
                owners: owners,
                threshold: threshold.current.value,
            }
        )
    },[])

    const addAccountLink = () => {
        owners.push({
            name: '',
            account: ''
        })
        setOwners([...owners]);
        setMultisigAccount(
            {
                wallet_name: walletName.current.value,
                accountId: '',
                owners: owners,
                threshold: threshold.current.value,
            }
        )
        console.log(multisigAccount)
    }

    function clearNoNum(event) {
        event.target.value = event.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        event.target.value = event.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        event.target.value = event.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        event.target.value = event.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        if (event.target.value.indexOf(".") < 0 && event.target.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            event.target.value = parseFloat(event.target.value);
        }
    }


    const handleInputChange = (event) => {
        const value = event.target.value;
        const inputType = event.target.id.split(' ')[0];
        const inputIndex = Number(event.target.id.split(' ')[1]);

        owners.map((owner, index) => {
            if (index === inputIndex) {
                if (inputType === 'name') {
                    owner.name = value
                }
                if (inputType === 'address') {
                    owner.account = value
                }
            }
        })

        setOwners([...owners]);
    }

    const handleConnect = () => {
        //TODO: 需要判断是否已经填了wallet名
        console.log('当前的wallet name IS ' + walletName.current.value) 
        console.log('当前的阈值 IS ' + threshold.current.value) 
        setMultisigAccount({
            wallet_name: walletName.current.value,
            accountId: '',
            owners: owners,
            threshold: threshold.current.value,
        })
        // 由于setState是异步的，所以这里一时无法更新为最新值
        // console.log(multisigAccount);
        // console.log('当前的阈值为' + threshold.current.value);
        // console.log('当前多签钱包名为'  + walletName.current.value)
       
        console.log(multisigAccount);

        navigate('/create-wallet/step3')
        localStorage.setItem('multisig-wallet', JSON.stringify(multisigAccount));

    }


    return(
        <div className="steps">

        <div className="create-wallet-steps">
            <StepProgess step="2"></StepProgess>
            
            <section>
                1. Name of the new Wallet, The new multisig wallet will only be available on 
                <span className="current-network">{localStorage.getItem('network')} </span>
                network
            </section>
            <div className="form-input">
                <input
                    ref = {walletName}
                    className="wallet-name" 
                    type="text"
                    placeholder="my-wallet-name" 
                />
            </div>

            <section>
                2. Your multisig wallet will have one or more owners. Your connected wallet address has been pre-filled as the first owner.
                <div className="address-form">
                    <div className="filled">
                        <div className="address-titles">
                            <div>NAME</div>
                            <div>ADDRESS</div>
                        </div>

                        {
                            owners.map((owner, index) =>(
                                <div className="address-inputs">
                                    <input type="text" id={`name ${index}`} disabled={index===0?true:false} defaultValue={owner.name} onChange={(e) => handleInputChange(e)}/>
                                    <div className="editable">
                                        <div className="validate-status"></div>
                                        <input type="text" id={`address ${index}`} disabled={index===0?true:false}  defaultValue = {owner.account} onChange={(e) => handleInputChange(e)}/>
                                    </div>
                                    <img src={Icons.Delete} className={index===0? "deletion": "deletion visible"}/>
                                </div>
                            ))
                        }
                        <div className="add-link" onClick={ addAccountLink }>
                            + add another owner
                        </div>
                    </div>
                </div>
            </section>

            <section>
                3. Any transaction requires the confirmation of:
                <div className="threshold">
                <input type="number" οnkeypress="value=value.replace('-','')" min="0" ref={threshold}/>
                    <span>out of owner(s)</span>
                </div>
            </section>

            <div className="btn-group">
                <div class="btn" onClick = {handleConnect}>
                    Continue
                </div>
                <Link to='/create-wallet'> cancel</Link>
            </div>
        </div>
        </div>
        
    )
}



export default CreateStep2;