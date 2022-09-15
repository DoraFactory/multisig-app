
const TransactionModal = () => {




    return (
        <div>
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
            <MultiAddressInput
              v-if="arg.type == 'MultiAddress'"
            />
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
              <img src="@/assets/copy-circle.svg"/>
            </div>
          </div>
          <div class="form-control">
            <div class="description">
              encoded call hash
            </div>
            <div class="encoded">
              {/* {{ encodeHash }} */}
              0xbf0216ef158c0ebed10992bc99c0b2cf3a2b06e53cbb82abd78030f62691ea02
              <img src="@/assets/copy-circle.svg"/>
            </div>
          </div>
          <div class="btn">
            Submit transaction
          </div>
        </div>
        </div>
    )
}

export default TransactionModal;