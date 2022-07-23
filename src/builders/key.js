import React from 'react';

const Key = (props) => {
    const RandomKey = Math.floor(Math.random() * 10)
    return (
        <div className="key-container" >
            <p id={props.index}  value={props.character} >
            {props.character}
            </p>
        </div>
        )
}

export default Key;