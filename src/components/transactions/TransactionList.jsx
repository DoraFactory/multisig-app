
const TransactionList = ({hash, tx, call}) => {
    return(
                  <div
                    v-for="(trans, hash) in transactions"
                    className="transaction-card"
                    >
                      <div class="transaction-summary">
                        <p>
                          <span class="summary-label">CALL HASH:</span>
                          <span class="summary-value">{hash}</span>
                        </p>
                        <p>
                          <span class="summary-label">BLOCK TIME:</span>
                          <span class="summary-value">{tx.when.height}</span>
                        </p>
                        <p>
                          <span class="summary-label">Depositor:</span>
                          <span class="summary-value">{tx.depositor}</span>

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
                          {/* 这里需要增加一些条件选项，控制这块的出现 */}
                          <div
                            v-if="tabIndex==0"
                            class="approve-btn"
                          >
                            ✓ Approve
                          </div>
                          <div
                            v-if="tabIndex==0"
                            class="reject-btn"
                          >
                            X Reject
                          </div>
                        </div>
                        <p class="status-summary">
                          {multisig_wallet.threshold} out of 3 owners
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
    )
}

export default TransactionList;