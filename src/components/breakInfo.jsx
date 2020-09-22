import React from 'react';

const BreakInfo = (props) => {
    return ( 
        <div className="col-6">
            <h3 id="break-label" className="mt-2 mb-2">Break Length</h3>
            <button 
                className="btn btn-danger" 
                onClick={props.decrementBreak}
                id="break-decrement">
                Decrement
            </button>
            <button className="btn btn-primary ml-1"
            onClick={props.incrementBreak}
            id="break-increment">
                Increment
            </button>
            <br/>
            <span 
                id="break-length" 
                className="badge badge-lg badge-success mt-3 shadow" 
                style={{fontSize:"25px"}}>

                Value : {props.length}
            </span>
        </div>
     );
}
 
export default BreakInfo;