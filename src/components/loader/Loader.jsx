import React from 'react';
import './Loader.css';

export default function loader({ fullscreen }) {

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