import React from "react";
import StepProgess from './stepProgess';
import Icons from '../../resources';

const CreateStep3 = () => {
    return(
        <div className="steps">
        <div className="create-wallet-steps">
            <StepProgess step="3"></StepProgess>
            <p>
                Review wallet information
            </p>
            <div className="sunmmary">
                <div className="top">
                    <div className="left-part">
                        <p className="first-red">
                            Name of new multisig
                        </p>
                        <p> wallet name</p>
                    </div>

                    <div className="right-part">
                        <p className="first-red">
                            Any transaction requires the confirmation of:
                        </p>
                        <p> xxx out of xxx owners </p>
                    </div>

                    <div className="owners">
                        <p className="first-red">
                            xxx wallet owners
                        </p>
                        <div className="profile">   
                            <img src={Icons.Avatar} />
                            <div className="name-info">
                                <p>acount name</p>
                                <p>account address</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="btn-group">
                <div className="btn">
                    Continue
                </div>
                <a href="">back</a>
            </div>
        </div>
        </div>
    )
}


export default CreateStep3;