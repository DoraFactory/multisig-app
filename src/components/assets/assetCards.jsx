import React from "react";
import Icons from "../../resources";
import '../../styles/assetCard.scss';
const AssetCards = () => {
    return(
        <div className="all-assets">
            <p className="title">
                ASSETS / COINS
            </p>
            <div className="asset-card-list">
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

            </div>
        </div>
    )
}

export default AssetCards;