import React, {useState, useEffect} from "react";
import Modal from '@mui/material/Modal';
import Icons from "../../resources";
import '../../styles/assetCard.scss';
import '../../styles/coinCard.scss';

import '../../styles/modal.scss';
import '../../resources/base.scss';

import { useSubstrateState  } from "../../context";

import { formatBalance } from '@polkadot/util'

const AssetCards = () => {
    const [open, setOpen] = useState(false);
    const [doraBalance, setDoraBalance] = useState();
    const {api, currentAccount} = useSubstrateState();
    const chainDecimals = api.registry.chainDecimals[0];

    const multisig = JSON.parse(localStorage.getItem('multisig-wallet'));
    const network = localStorage.getItem('network');
    
    useEffect(() => {
        api.query.system.account(multisig.accountId, balanceInfo => {
            const free = formatBalance(balanceInfo.data.free, { withSi: false, forceUnit: '-' });
            setDoraBalance(free);
        })
    }, [api, doraBalance, setDoraBalance])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div className="all-assets">
            <p className="title">
                ASSETS / COINS
            </p>
            <div className="asset-card-list">

                {network == 'Polkadot' ? 
                    (
                        <div className="asset-card">
                            <div className="asset-network">
                                <img src = {Icons.Polkadot}></img>
                                <span> Polkadot</span>
                            </div>
                            <div className="asset-detail">
                                <p className="detail-label">
                                    BALANCE
                                </p>
                                <p className="detail-value">
                                    0
                                </p>
                                <p className="detail-label">
                                    VALUE
                                </p>
                                <p className="detail-value">
                                    N/A
                                </p>
                                <span className="receive-btn">
                                    ↙ Receive
                                </span>
                            </div>
                        </div>
                    ) 
                    : null
                }

                {network == 'Kusama' ? 
                    (
                        <div className="asset-card">
                            <div className="asset-network">
                                    <img src = {Icons.Kusama}></img>
                                    <span> Kusama</span>
                            </div>
                            <div className="asset-detail">
                                <p className="detail-label">
                                    BALANCE
                                </p>
                                <p className="detail-value">
                                    0
                                </p>
                                <p className="detail-label">
                                    VALUE
                                </p>
                                <p className="detail-value">
                                    N/A
                                </p>
                                <span className="receive-btn">
                                    ↙ Receive
                                </span>
                            </div>
                        </div>
                    ) 
                    : null
                }
                
                {network == 'DoraFactory' ? 
                    (
                        <div className="asset-card">
                            <div className="asset-network">
                                    <img src = {Icons.Dora}></img>
                                    <span> DoraFactory</span>
                            </div>
                            <div className="asset-detail">
                                <p className="detail-label">
                                    BALANCE
                                </p>
                                <p className="detail-value">
                                    {doraBalance}
                                </p>
                                {/* <p className="detail-label">
                                    VALUE
                                </p>
                                <p className="detail-value">
                                    $
                                </p> */}
                                <span className="receive-btn" onClick={handleOpen}>
                                    ↙ Receive
                                </span>

                                <Modal
                                open={open}
                                onClose={handleClose}
                                >
                                    <div
                                        v-if="showModal"
                                        className="modal receive-assets"
                                        role="dialog"
                                    >
                                        <span
                                            class="close" onClick={handleClose}
                                        >
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
                                        <div className="receive-assets">
                                            <h2>Receive Assets</h2>
                                            <div className="note-info">
                                                <span>
                                                    <svg
                                                    width="48"
                                                    height="48"
                                                    viewBox="0 0 48 48"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40ZM25.5586 26.7129H22.4297L22.125 15.3691H25.875L25.5586 26.7129ZM26.1328 30.6738C26.1328 31.8809 25.3242 32.6309 24 32.6309C22.6875 32.6309 21.8672 31.8809 21.8672 30.6738C21.8672 29.4551 22.6875 28.7051 24 28.7051C25.3242 28.7051 26.1328 29.4551 26.1328 30.6738Z"
                                                        fill="#FF761C"
                                                    />
                                                    </svg>
                                                </span>
                                                <div className="note-text">
                                                    Please double check the address and only send funds to an address on the Dorafactory network.
                                                </div>
                                            </div>
                                            <div className="description">
                                            This is the address of your wallet.Deposit funds by scanning the QR code or copying the address below.
                                            Only send Dorafactory Network and assets to this address!
                                            </div>
                                            <div className="address-info">
                                            {multisig.accountId}
                                            </div>
                                            <div
                                            className="btn stretch-btn"
                                            onClick={handleClose}>
                                            Done
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    ) 
                    : null
                }
                
            </div>
        </div>
    )
}

export default AssetCards;