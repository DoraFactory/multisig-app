import React from "react";
import '../../styles/home.scss';
import Icons from '../../resources';

const NetworkInfo = () => {
    return(
        <div className="header">
            <span></span>
            <div className="current-account">
                <span className="selected-network">
                xxxx
                </span>
                <img id="network-logo" src={Icons.Logo}/>
            </div>
        </div>
    )
}

export default NetworkInfo;
