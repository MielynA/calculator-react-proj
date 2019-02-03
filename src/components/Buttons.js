import React from 'react';

const TheButtons = (props) => {
    if (props.orange) {
        return (
            <button className="button col col-3 orange" style={{ minHeight: '60px' }} onClick={props.cb} value = {props.name}>{props.name}</button>
        );
    }
    else if(props.big){
        return (
            <button className="button col col-6 " style={{ minHeight: '60px' }}onClick={props.cb} value = {props.name}>{props.name}</button>
        );
    }
    else {
        return (
            <button className="button col col-3 " style={{ minHeight: '60px' }} onClick={props.cb} value = {props.name}>{props.name}</button>
        );
    }
}

export default TheButtons