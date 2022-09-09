import React from 'react';
import StepProgess from './stepProgess';
import icon_polkadot from '../../resources/icon_polkadot.svg'
import '../../styles/createSteps.scss';
// import '../../styles/step1.scss';
import '../../styles/modal.scss';
import '../../styles/wallet.scss';
import '../../resources/base.scss';
import Modal from '@mui/material/Modal';

const CreateStep1 = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div className="steps">
            <div className="create-wallet-steps">
                <StepProgess step="1"></StepProgess>
                <p className="intro-text">
                    1、Select network on which to create your multisig wallet.The app is currently pointing to
                </p>
                <div className="selected-network">
                    xxxxx
                </div>
                <p className="guide-text">
                    2、Please use Polkadot JS Extension.
                </p>
                <div className="extension-btn">
                    {/* <IconPolkadot></IconPolkadot> */}
                    <img src={icon_polkadot}/>
                    Polkadot
                </div>
                <div class="btn-group"> 
                {/* TODO: next step and connect wallet. */}
                    <div class="btn" onClick={handleOpen}>
                            Connect Wallet
                    </div>
                    {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
                            <slot name="content" />
                            <div class="main">
                                <h3>Select an account</h3>
                                <select>
                                    <option>Please select a account</option>
                                    <option>fengfeng(5G48MUSiceK26a32TA3NSciGr2w7azCMVbCMsyKQDyjj6BWt)</option>
                                </select>
                            </div>
                        </div>
                    </Modal>
                    <a >cancel</a>
                </div>
            </div>
        </div>
    )
}


export default CreateStep1;