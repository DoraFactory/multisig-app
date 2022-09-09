import React from "react";
import StepProgess from './stepProgess';
import Icons from '../../resources';
import '../../styles/createSteps.scss';

const CreateStep2 = () => {
    return(
        <div className="create-wallet-steps">
            <StepProgess></StepProgess>
            
            <section>
                1. Name of the new Wallet，The new multisig wallet will only be available on 
                <span className="current-network">xxxxx network</span>
            </section>
            <div className="form-input">
                <input 
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
                        <div className="address-inputs">
                            <input type="text" />
                            <div className="editable">
                                <div className="validate-status"></div>
                                <input type="text" />
                            </div>
                            <img src={Icons.Delete} className="deletion"/>
                        </div>

                        <div className="add-link">
                            + add another owner
                        </div>
                    </div>
                </div>
            </section>

            <section>
                3. Any transaction requires the confirmation of:
                <div className="threshold">
                    <input type="number" />
                    <span>out of owner(s)</span>
                </div>
            </section>

            <div className="btn-group">
                <div className="btn">
                    Continue
                </div>
                <a> cancel</a>
            </div>
        </div>
        
    )
}


export default CreateStep2;