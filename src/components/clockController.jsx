import React from 'react'
const ClockController = (props) => {
    
    const label=props.label.map((lab,index)=>{
        return <p key={index}>{lab} count: {index+1}</p>
    });

    return ( 
        <div className="w-50 mx-auto d-block text-center" id="timer-label">
            {label}
            <h2 
                id="time-left"
                className=" text-cenetr " 
                style={{fontSize:"25px"}}>
                {props.format()}
            </h2>
            <button 
                className="btn btn-outline-primary shadow-lg mt-2" 
                onClick={props.controlTimer}
                id="start_stop">
                START-STOP
            </button>
            <button 
                className="btn btn-outline-danger ml-2 shadow-lg mt-2" 
                onClick={props.reset}
                id="reset">
                RESET
            </button>
        </div>
     );
}
 
export default ClockController;