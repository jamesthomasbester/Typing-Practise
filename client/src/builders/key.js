import React from 'react';

const Key = (props) => {
    if(props.character == "_"){
        return (
            <div className="space-xl" >
            <p className="key" id={props.index}  value={props.character} >
            _____
            </p>
        </div>
            )
    }else{
    return (
        <div className="key-container" >
            <p className="key" id={props.index} key={props.index}  value={props.character} >
            {props.character}
            </p>
        </div>
        )
    }
}

export default Key;