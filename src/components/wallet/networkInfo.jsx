import React from "react";
import '../../styles/home.scss';
import Icons from '../../resources';
import localStorage from 'localStorage';

const NetworkInfo = () => {
    return(
        <div className="header">
            <span></span>
            <div className="current-account">
                <span className="selected-network">
                    {localStorage.getItem("network")}
                </span>
                <img id="network-logo" src={Icons.Logo}/>
            </div>
        </div>
    )
}

export default NetworkInfo;
