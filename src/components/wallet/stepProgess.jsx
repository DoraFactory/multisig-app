import React from 'react';
import '../../styles/wallet.scss';
const StepProgess = (step) => {
    return (
        <div className="step-progress">
            <div className={step.step>="1"? "number-in-circle": "number-in-circle inactive-circle"}>
                1
            </div>
            <div className={step.step==="1"?"connector-line": "connector-line active"}>
            </div>

            <div className={step.step>="2"? "number-in-circle": "number-in-circle inactive-circle"}>
                2
            </div>
            <div className={step.step==="3"?"connector-line active": "connector-line"}></div>
            <div className={step.step==="3"? "number-in-circle": "number-in-circle inactive-circle"}>
                3
            </div>
        </div>
    )
}

export default StepProgess;