import React from 'react';

const SessionInfo = (props) => {
    return ( 
        <div className="col-6">
            <h3 id="session-label" className="mt-2">Session Length</h3>
            <button 
                className="btn btn-danger" 
                onClick={props.decrementSession}
                id="session-decrement">
                Decrement
            </button>
            <button 
                className="btn btn-primary ml-1" 
                onClick={props.incrementSession}
                id="session-increment">
                Increment
            </button>
            <br/>
            <p 
                id="session-length" 
                className="badge badge-lg badge-warning text-dark shadow mt-3" 
                style={{fontSize:"25px"}}>
                Value : {props.length}
            </p>
        </div>
     );
}
 
export default SessionInfo;