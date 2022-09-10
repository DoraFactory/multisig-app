import React from "react";
import avatar from '../../resources/avatar.svg'
import copy_circle from '../../resources/copy-circle.svg';
import '../../styles/transactionStatus.scss';
import '../../styles/newTransaction.scss';
import Modal from '@mui/material/Modal';

const TransactionStatus = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const Tabs = ['Pending', 'Created', 'Completed'];

    return(
        <div>
        <div className="all-transactions">
            <p className="title">
                TRANSACTION /
            </p>
            <div className="options">
                <ul>
                    {Tabs.map((tab) => {
                        return <li>{tab}</li>
                    })}
                </ul>

                <div className="btn new-transaction" onClick={handleOpen}>
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
                            <span class="close" onClick={handleClose}>
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
                            <div class="main">

                                <h3> New transaction</h3>
                                <div class="form-groups">
                                <div class="wallet-header">
                                    <div class="description">
                                    Accounts
                                    </div>
                                    <div class="balance">
                                    Balance: 100
                                    </div>
                                </div>
                                <div class="wallet-info">
                                    1c9CM8yp4q33KBdhjdLBK9Nk74KkPJ7eM9uQqhAovNofgkS
                                </div>
                                <div class="form-control">
                                    <div class="description">
                                    Submit
                                    </div>
                                    <div class="controls">
                                    <el-dropdown
                                        trigger="click"
                                        max-height="400px"
                                        class="module-control"
                                    >
                                        <span class="el-dropdown-link">
                                        balances
                                        </span>
                                        <el-icon class="el-icon--right">
                                        {/* <ArrowDown /> */}
                                        </el-icon>
                                    </el-dropdown>
                                    <el-dropdown
                                        trigger="click"
                                        max-height="400px"
                                        class="method-control"
                                    >
                                        <div class="el-dropdown-link">
                                        <span></span>
                                        <span></span>
                                        </div>
                                        <el-icon class="el-icon--right">
                                        {/* <ArrowDown /> */}
                                        </el-icon>

                                    </el-dropdown>
                                    </div>
                                </div>
                                <div
                                    v-for="(arg,i) in selectedMethod.args"
                                    class="form-control"
                                >
                                    <div class="arg-name">
                                    </div>
                                    {/* <MultiAddressInput
                                    v-if="arg.type == 'MultiAddress'"
                                    /> */}
                                    <input
                                    v-else
                                    v-model="values[i]"
                                    class="arg-value"
                                    />
                                </div>
                                <div class="form-control">
                                    <div class="description">
                                    encoded call data
                                    </div>
                                    <div class="encoded">
                                    {/* {{ encodeData }} */}
                                    0x32000000000000000000
                                    <img src={copy_circle}/>
                                    </div>
                                </div>
                                <div class="form-control">
                                    <div class="description">
                                    encoded call hash
                                    </div>
                                    <div class="encoded">
                                    {/* {{ encodeHash }} */}
                                    0xbf0216ef158c0ebed10992bc99c0b2cf3a2b06e53cbb82abd78030f62691ea02
                                    <img src={copy_circle}/>
                                    </div>
                                </div>
                                <div class="btn">
                                    Submit transaction
                                </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
            </div>
        </div>
            <div class="transaction-card-list">
            <div
              v-for="(trans, hash) in transactions"
              class="transaction-card"
            >
              <div class="transaction-summary">
                <p>
                  <span class="summary-label">CALL HASH:</span>
                  <span class="summary-value">0x123123</span>
                </p>
                <p>
                  <span class="summary-label">TIME:</span>
                  <span class="summary-value">12.30</span>
                </p>
                <p>
                  <span class="summary-label">Depositor:</span>
                </p>
                <p v-if="callDetail(hash)">
                  <span class="summary-label">PALLET/MODULEID:</span>
                  <span class="summary-value">balances/transfer</span>
                </p>
                <p v-if="callDetail(hash)">
                  <span class="summary-label">PARAMETER:</span>
                  <span class="summary-value">1000</span>
                </p>
              </div>
              <div class="transaction-status">
                <div class="status-bar">
                  <span>Pending approval</span>
                  <div
                    v-if="tabIndex==0"
                    class="approve-btn"
                  >
                    Approve
                  </div>
                </div>
                <p class="status-summary">
                 1 out of 3 owners
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
          </div>
          </div>
    )
}


export default TransactionStatus;