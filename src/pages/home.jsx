import React from "react";
import logo from '../resources/logo.svg';
import '../styles/home.scss';

const Home = () => {
    return(
        <div className="content"> 
            <div className="header">
                <select>
                    {/* */}
                </select>
                <img src={logo}></img>
            </div>
            <h2>Welcome to Substrate Multisig</h2>
            <main></main>
        </div>
)}



export default Home;