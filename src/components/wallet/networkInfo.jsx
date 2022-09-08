import React from "react";
import '../../styles/home.scss';
import Icons from '../../resources';

const NetworkInfo = () => {
    return(
        <div>
            <div className="header">
                <span className="selected-network">
                xxxx
                </span>
                <img id="network-logo" src={Icons.Logo}></img>
            </div>
            <h2>Welcome to Substrate Multisig</h2>
        </div>
    )
}

export default NetworkInfo;