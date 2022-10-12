import { React, useState, useEffect } from 'react';
import avatar from '../../resources/avatar.svg'
import copy_circle from '../../resources/copy-circle.svg';
import '../../styles/transactionStatus.scss';
import '../../styles/newTransaction.scss';

import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useSubstrateState } from "../../context";
import { sortAddresses } from '@polkadot/util-crypto';
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp'
import {encodeAddress} from '@polkadot/util-crypto'


import axios from 'axios';

const TransactionStatus = () => {

    const [open, setOpen] = useState(false);
    // current args
    const [multiArgs, setMultiArgs] = useState('Id');
    const [activeTab, setActiveTab] = useState("Pending");
    const [unsub, setUnsub] = useState(null)
    // all methods of pallet balances 
    const [methods, setMethods] = useState([]);
    // current method
    const [method, setMethod] = useState(methods[0]);
    // current method parameters
    const [params, setParams] = useState(new Array());
    // encode data
    const [encodeData, setEncodeData] = useState('0x');
    // encodeed data hash
    const [encodeHash, setEncodeHash] = useState('0x');
    // created multisig tx list
    const [createdTx, setCreatedTx] = useState({});
    // pending multisig tx list
    const [pendingTx, setPendingTx] = useState({});
    // completed multisig tx list
    const [completedTx, setCompletedTx] = useState([]);

    const [currTxList, setCurrTxList] = useState({});
    // 
    const [approvealNums, setApprovealNums] = useState(0);
    const [calls, setCalls] = useState({});
    // 
    const [blockHeight, setBlockHeight] = useState();

    const {api} = useSubstrateState();
    const Tabs = ['Pending', 'Created', 'Completed'];
    const SS58Prefix = 128;
    const NewTrans = () => {
      setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const selectTab = (tab) => {
        return (
          <li id={tab} className={activeTab===tab ? "selected" : ""} onClick={() => setActiveTab(tab)}>
            {tab}
          </li>
        )
    }
    const handleSelectChange = (event) => { 
      setMultiArgs(event.target.value);
    };
    const handleMethodChange = (event) => {
      setMethod(event.target.value);
    };
    const handleGetDestParams = (value, index) => {
      params[index] = value;
      setParams([...params]);
    }

    let multisig_wallet = JSON.parse(localStorage.getItem('multisig-wallet'));
    let main_owner = JSON.parse(localStorage.getItem('main-account'));

    const submitTx = async() => { 
      // current owner / sender of this multisig wallet
      const otherAddresses = multisig_wallet.owners.filter((acc) => {
        return acc.account != encodeAddress(main_owner, SS58Prefix);
      }).map((acc) => {return acc.account});
      console.log(otherAddresses)
      const otherSignatories = sortAddresses(otherAddresses, 0);
      const injector = await web3FromAddress(main_owner);
      const extrinsic = api.tx.multisig.asMulti(
        multisig_wallet.threshold,
        otherSignatories,
        null,
        encodeData,
        true,
        0
      );

      extrinsic.signAndSend(main_owner, {signer: injector.signer}, async result => {
        // let block_number;
        if (result.status.isInBlock) {
          console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
          // block_number = await api.rpc.chain.getBlock(result.status.asInBlock).block;
          // console.log(block_number);
          // console.log(JSON.stringify(result));
        }else if(result.status.isFinalized){
          console.log(result.status.isFinalized)
          if(!result.dispatchError){
            // save current multisig wallet's transaction 
            console.log(result.txHash)
            // console.log(block_number);
            let data = {
              call_hash : api.registry.hash(encodeData).toHex(),
              detail: {
                block_height: 0,
                address: main_owner,
                pallet_method: `balances/` + method.name,
                parameters: params,
              },
              status: 0,
              operation: 'approve',
              transaction_hash: result.txHash,
            }
            const res = await axios({
                  method: "post",
                  url: `http://127.0.0.1:8000/wallets/${multisig_wallet.accountId}/transactions/`,
                  headers: {
                    'Content-Type': 'application/json',
                    "dorafactory-token": sessionStorage.getItem('token'),
                  },
                  data
            });
            console.log(res);
            console.log('send multisig tx successfully ! ');
          }else{
            console.log(`transaction failed`);
          }
        }
      })
      setUnsub(() => unsub)
      setOpen(false);
    }

    const approveTx = async(hash) => {
      //TODO: patch后端检测
      const trans = currTxList[hash];
      const otherAddresses = multisig_wallet.owners.filter((acc) => {
        return acc.account != main_owner
      }).map((acc) => {return acc.account});
      console.log(otherAddresses)
      const otherSignatories = sortAddresses(otherAddresses, 0);
      const injector = await web3FromAddress(main_owner);

      const extrinsic = api.tx.multisig.approveAsMulti(
        multisig_wallet.threshold,
        otherSignatories,
        trans.when,
        hash,
        100000000000,     // currently, we use this default value
      )

      extrinsic.signAndSend(main_owner, {signer: injector.signer}, result => {
        if (result.status.isInBlock) {
          console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
        }else if(result.status.isFinalized){
          console.log('send multisig tx successfully ! ');
        }
      })
      setUnsub(() => unsub)
    }
    
    
    const rejectTx = async(hash) => {
      const trans = currTxList[hash];
      const otherAddresses = multisig_wallet.owners.filter((acc) => {
        return acc.account != main_owner
      }).map((acc) => {return acc.account});
      console.log(otherAddresses)
      //TODO: we need to change the ss58format according the different network!
      const otherSignatories = sortAddresses(otherAddresses, 128);
      const injector = await web3FromAddress(main_owner);
      const extrinsic = api.tx.multisig.cancelAsMulti(
        multisig_wallet.threshold,
        otherSignatories,
        trans.when,
        hash,
      )
      extrinsic.signAndSend(main_owner, {signer: injector.signer}, result => {
        if (result.status.isInBlock) {
          console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
        }else if(result.status.isFinalized){
          console.log('send multisig tx successfully ! ');
        }
      })
      setUnsub(() => unsub)
    } 


    useEffect(() => {
      if(method && params.length == method.args.length){
        // update encode data and encode data hash
        // in current multisig app, we only support balances pallet's method
        const extrinsicFn = api.tx['balances'][method.key];
        let encoded_data = extrinsicFn(...params).method.toHex();
        setEncodeData(encoded_data);
        let encoded_hash = api.registry.hash(encoded_data).toHex();
        setEncodeHash(encoded_hash);
      }
    }, [method, params])


    useEffect(() => {
      const balance_methods = api.tx['balances'];
      for (let k in balance_methods) {
        const meta = balance_methods[k].meta.toJSON()
        const balance_method = {
            'name': `${k}(${meta.args.map((e)=>e.name).join(',')})`,
            'doc': meta.docs[0],
            'args': meta.args,
            'key': k,
        }
        
        methods.push(balance_method);
        console.log(methods)
        setMethods([...methods.slice(6,12)]); 
      }
    }, [])


    useEffect(() => {
        api.query.multisig.multisigs.entries(multisig_wallet.accountId, multisigTxs => {
          if(multisigTxs.length){
            multisigTxs.forEach(([key, exposure]) => {
              // keys里面存的多签地址和call hash
              const keys = key.toHuman()
              console.log(keys)
              // 当前多签地址的所有多签交易
              const trans = exposure.toJSON()
              console.log(trans)
              // as polkdot extension provides us substrate address, we have to convert first to compare
              const owner = trans.depositor
              // group transactions by depositor
              // key: encoded data hash  value: tx info

              console.log(trans.approvals.length);
              console.log(multisig_wallet.owners.length)
              if(owner == encodeAddress(main_owner, SS58Prefix)){
                createdTx[keys[1]] = trans;
                setCreatedTx(createdTx);
              }
              if(trans.approvals.length < multisig_wallet.owners.length){
                pendingTx[keys[1]] = trans;
                setPendingTx(pendingTx);
              }
            })
          }
        });

        axios.get(
          `http://127.0.0.1:8000/wallets/${multisig_wallet.accountId}/transactions/`,
          {
            headers: {"dorafactory-token": sessionStorage.getItem("token")}
          }).then((res) => {
            setCompletedTx(res.data.detail);
          })

    }, [api, pendingTx, createdTx])

    useEffect(() => {
      api.query.multisig.calls.entries((resCalls) => {
        console.log('我在查询calls')
        resCalls.forEach(([key, exposure]) => {
          const keys = key.toHuman()
          const callInfo = exposure.toHuman()
          // key: encoded data hash  value: call info
          calls[keys[0]] = callInfo;
          setCalls(calls);
        })
      })

    }, [])


    // record the current tx list according to the tab
    useEffect(() => {
      if(activeTab == "Pending"){
        console.log('this is pending');
        setCurrTxList(pendingTx);
      }else if(activeTab == "Created"){
        setCurrTxList(createdTx);
      }else {
        console.log('this is completed');
        console.log(completedTx);
        // get the completed transaction and update
        console.log('completed tx!!!');
      }
    }, [activeTab])

/*     console.log('pending is ' + JSON.stringify(pendingTx));
    console.log(createdTx)
    console.log(currTxList)
    console.log(activeTab)
    console.log('calls is ' + JSON.stringify(calls)); */


    return(
        <div>
          <div className="all-transactions">
              <p className="title">
                  TRANSACTION /
              </p>
              <div className="options">
                  <ul>
                      {Tabs.map((tab) => {
                          return selectTab(tab)
                      })}
                  </ul>

                  <div className="btn new-transaction" onClick={NewTrans}>
                      ↗ New transaction
                  </div>
                  <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      >
                          <div
                          v-if="showModal"
                          class="modal"
                          role="dialog"
                          >
                              <span className="close" onClick={handleClose}>
                                  <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  >
                                  <rect
                                      x="22.3638"
                                      y="11.0503"
                                      width="16"
                                      height="2"
                                      rx="1"
                                      transform="rotate(135 22.3638 11.0503)"
                                      fill="#FF761C"
                                  />
                                  <rect
                                      x="11.0503"
                                      y="9.63599"
                                      width="16"
                                      height="2"
                                      rx="1"
                                      transform="rotate(45 11.0503 9.63599)"
                                      fill="#FF761C"
                                  />
                                  </svg>
                              </span>
                              <div className="main">
                                  <h3> New transaction</h3>
                                  <div className="form-groups">
                                  <div className="wallet-header">
                                      <div className="description">
                                      Account
                                      </div>
                                      <div className="balance">
                                      Balance: 100
                                      </div>
                                  </div>
                                  <div className="wallet-info">
                                      {multisig_wallet.accountId}
                                  </div>
                                  <div className="form-control">
                                      <div className="description">
                                      Submit
                                      </div>
                                      <div className='flex-submit-div'>
                                        <div><input value="balances" className='module-input'/></div>
                                        <div>
                                        <FormControl sx={{ m: 1, minWidth: 800 }}  size="small">
                                        <Select           
                                          labelId="demo-select-small"
                                          id="demo-select-small"
                                          value={method}
                                          onChange={handleMethodChange}
                                          displayEmpty
                                          inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                          {methods.map((method) => {
                                            return(
                                              <MenuItem value={method}>
                                                <div className="method-dropdown">
                                                  <span>{method.name}</span>
                                                  <span>{method.doc}</span>
                                                </div>
                                              </MenuItem>
                                            )
                                          })}
                                        </Select>
                                      </FormControl>
                                      </div>
                                      </div>
                                  </div>

                                  {method ? method.args.map((args, index) => (
                                    <div className="form-control">
                                        <div class="arg-name">
                                          {args.name + ':' + args.type + '(' + args.typeName + ')'}
                                        </div>
                                        {args.type === "MultiAddress" ? 
                                            (
                                              <div>
                                                <FormControl sx={{ m: 1, minWidth: 120 }}  size="small">
                                                <Select
                                                  labelId="demo-select-small"
                                                  id="demo-select-small"
                                                  value={multiArgs}
                                                  onChange={handleSelectChange}
                                                  displayEmpty
                                                  inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                  <MenuItem value="Id">Id</MenuItem>
                                                  <MenuItem value="Index">Index</MenuItem>
                                                  <MenuItem value="Raw">Raw</MenuItem>
                                                  <MenuItem value="Address32">Address32</MenuItem>
                                                  <MenuItem value="Address20">Address20</MenuItem>
                                                </Select>
                                              </FormControl>
                                              <input class="arg-value" onChange={(e) => {
                                                  handleGetDestParams(e.target.value, index);
                                              }}/>
                                              </div>
                                            ) : (
                                              <input class="arg-value" onChange={(e) => {
                                                handleGetDestParams(e.target.value, index);
                                            }}/>
                                            )
                                        }
                                    </div>
                                  )) : 
                                    null
                                  }

                                  <div class="form-control">
                                      <div class="description">
                                      encoded call data
                                      </div>
                                      <div class="encoded">
                                          {encodeData}
                                      <img src={copy_circle}/>
                                      </div>
                                  </div>
                                  <div class="form-control">
                                      <div class="description">
                                      encoded call hash
                                      </div>
                                      <div class="encoded">
                                        {encodeHash}
                                      <img src={copy_circle}/>
                                      </div>
                                  </div>
                                  <div class="btn" onClick={submitTx}>
                                      Submit transaction
                                  </div>
                                  </div>
                              </div>
                          </div>
                      </Modal>
              </div>
          </div>

          <div className="transaction-card-list">
                { 
                  activeTab === 'Pending' ? Object.entries(currTxList).map(([hash, tx]) => (
                    <div className="transaction-card">
                      <div class="transaction-summary">
                        <p>
                          <span class="summary-label">CALL HASH:</span>
                          <span class="summary-value">{hash.substring(0,10) + '...' + hash.substring(49,)}</span>
                        </p>
                        <p>
                          <span class="summary-label">BLOCK TIME:</span>
                          <span class="summary-value">{tx.when.height}</span>
                        </p>
                        <p>
                          <span class="summary-label">Depositor:</span>
                          <span class="summary-value">{tx.depositor.substring(0,15)+ '...' + tx.depositor.substring(35)}</span>

                        </p>
                        <p v-if="callDetail(hash)">
                          <span class="summary-label">MODULEID/METHOD:</span>
                          { JSON.stringify(calls) != '{}' ? (
                            <span class="summary-value">{calls[hash][0].section  + '/' + calls[hash][0].method}</span>
                          ) : null}
                        </p>
                        <p v-if="callDetail(hash)">
                          <span class="summary-label">PARAMETER:</span>
                          {JSON.stringify(calls) != '{}' ? (
                            <span class="summary-value">{JSON.stringify(calls[hash][0].args)}</span> 
                          ) : null}
                        </p>
                      </div>
                    
                      <div class="transaction-status">
                          <div class="status-bar">
                            <span>Pending approval</span>
                            {tx.depositor == encodeAddress(main_owner, SS58Prefix) ? (
                              <div
                                v-if="tabIndex==0"
                                class="reject-btn"
                                onClick={() =>rejectTx(hash)}
                              >
                                X Reject
                              </div>
                              ) 
                            : (
                              <div
                                v-if="tabIndex==0"
                                class="approve-btn"
                                onClick={() =>approveTx(hash)}
                              >
                                ✓ Approve
                              </div>
                              )
                            }
                          </div>
                        
                        <p class="status-summary">
                          {multisig_wallet.threshold} out of {multisig_wallet.owners.length} owners
                        </p>

                        <div class="progress-bar">
                          <div class="progress-created">
                            <div class="circle-sign">
                              +
                            </div>
                            <span>Created</span>
                            <span class="connect-line" />
                          </div>
                          <div>
                            <div class="progress-confirmed">
                              <div class="circle-sign" />
                              <div class="">
                                Confirmed
                              </div>
                              <span class="connect-line waiting" />
                            </div>
                          </div>
                          <div class="progress-executed inactive">
                            <div class="circle-sign empty" />
                            <div class="">
                              Executed
                            </div>
                          </div>
                        </div>

                        <div class="users-list">
                          {tx.approvals.map((approver) => (
                            <div
                              class="user-info"
                            >
                              <img src={avatar}/>
                              <div class="user-profile">
                                <p>Account</p>
                                <p>{approver.substring(0,7) + '...' + approver.substring(42,)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                      </div>
                    </div>
                  )) : 
                  null
                }


                { 
                  activeTab === 'Created' ? Object.entries(currTxList).map(([hash, tx]) => (
                    <div className="transaction-card">
                      <div class="transaction-summary">
                        <p>
                          <span class="summary-label">CALL HASH:</span>
                          <span class="summary-value">{hash.substring(0,10) + '...' + hash.substring(49,)}</span>
                        </p>
                        <p>
                          <span class="summary-label">BLOCK TIME:</span>
                          <span class="summary-value">{tx.when.height}</span>
                        </p>
                        <p>
                          <span class="summary-label">Depositor:</span>
                          <span class="summary-value">{tx.depositor.substring(0,15)+ '...' + tx.depositor.substring(35)}</span>

                        </p>
                        <p v-if="callDetail(hash)">
                          <span class="summary-label">MODULEID/METHOD:</span>
                          { JSON.stringify(calls) != '{}' ? (
                            <span class="summary-value">{calls[hash][0].section  + '/' + calls[hash][0].method}</span>
                          ) : null}
                        </p>
                        <p v-if="callDetail(hash)">
                          <span class="summary-label">PARAMETER:</span>
                          {JSON.stringify(calls) != '{}' ? (
                            <span class="summary-value">{JSON.stringify(calls[hash][0].args)}</span> 
                          ) : null}
                        </p>
                      </div>
                    
                      <div class="transaction-status">
                        <p class="status-summary">
                          {multisig_wallet.threshold} out of {multisig_wallet.owners.length} owners
                        </p>

                        <div class="progress-bar">
                          <div class="progress-created">
                            <div class="circle-sign">
                              +
                            </div>
                            <span>Created</span>
                            <span class="connect-line" />
                          </div>
                          <div>
                            <div class="progress-confirmed">
                              <div class="circle-sign" />
                              <div class="">
                                Confirmed
                              </div>
                              <span class="connect-line waiting" />
                            </div>
                          </div>
                          <div class="progress-executed inactive">
                            <div class="circle-sign empty" />
                            <div class="">
                              Executed
                            </div>
                          </div>
                        </div>

                        <div class="users-list">
                          {tx.approvals.map((approver) => (
                            <div
                              class="user-info"
                            >
                              <img src={avatar}/>
                              <div class="user-profile">
                                <p>Account</p>
                                <p>{approver.substring(0,7) + '...' + approver.substring(42,)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                            
                      </div>
                    </div>
                  )) : 
                  null
                }

                { 
                  activeTab === 'Completed' ? completedTx.map((tx_info) => (
                    <div className="transaction-card">
                      <div class="transaction-summary">
                        <p>
                          <span class="summary-label">CALL HASH:</span>
                          <span class="summary-value">{tx_info.call_hash.substring(0,10) + '...' + tx_info.call_hash.substring(49,)}</span>
                        </p>
                        <p>
                          <span class="summary-label">BLOCK TIME:</span>
                          <span class="summary-value">{tx_info.detail.block_height}</span>
                        </p>
                        <p>
                          <span class="summary-label">Depositor:</span>
                          <span class="summary-value">主账户</span>

                        </p>
                        <p v-if="callDetail(hash)">
                          <span class="summary-label">MODULEID/METHOD:</span>
                            <span class="summary-value">{tx_info.detail.pallet_method}</span>
                        </p>
                        <p v-if="callDetail(hash)">
                          <span class="summary-label">PARAMETER:</span>
                            <span class="summary-value">{tx_info.detail.parameters[0] + tx_info.detail.parameters[1]}</span> 
                        </p>
                      </div>
                    
                      <div class="transaction-status">
                        <p class="status-summary">
                          {multisig_wallet.threshold} out of {multisig_wallet.owners.length} owners
                        </p>

                        <div class="progress-bar">
                          <div class="progress-created">
                            <div class="circle-sign">
                              +
                            </div>
                            <span>Created</span>
                            <span class="connect-line" />
                          </div>
                          <div>
                            <div class="progress-confirmed">
                              <div class="circle-sign" />
                              <div class="">
                                Confirmed
                              </div>
                              <span class="connect-line waiting" />
                            </div>
                          </div>
                          <div class="progress-executed inactive">
                            <div class="circle-sign empty" />
                            <div class="">
                              Executed
                            </div>
                          </div>
                        </div>

                        <div class="users-list">
                          <div
                            v-for="(addr, i) in trans.approvals"
                        
                            class="user-info"
                          >
                            <img src={avatar}/>
                            <div class="user-profile">
                              <p>Account</p>
                              <p>5EyU8W...wSL</p>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  )) : 
                  null
                }
            </div>
          </div>
    )
}


export default TransactionStatus;