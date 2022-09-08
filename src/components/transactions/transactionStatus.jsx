import React from "react";
import '../../styles/transactionStatus.scss';

const TransactionStatus = () => {

    const Tabs = ['Pending', 'Created', 'Completed'];

    return(
        <div className="all-transactions">
            <p className="title">
                TRANSACTION /
            </p>
            <div className="options">
                <ul>
                    {Tabs.map((tab) => {
                        return <li>{tab}</li>
                    })}
                </ul>

                <div className="btn new-transaction">
                    ↗ New transaction
                </div>
            </div>
        </div>
    )
}


export default TransactionStatus;