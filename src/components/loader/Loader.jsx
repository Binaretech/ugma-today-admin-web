import React from 'react';
import './Loader.css';

/**
 * @typedef {object} Props
 * @prop {boolean} fullscreen 
 *  
 * @param {Props} props 
 */
export default function Loader({ fullscreen }) {

    function spinner() {
        return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

        )
    }

    return fullscreen ? <div className="loader-fullscreen">{spinner()}</div> : spinner()
}