import React from 'react'

import logo from "../../../static/assets/Libarbarian.jpg"

export default function landing() {
    return (
        <div className='landing-wrapper'>
            <h1>Welcome to<br/>Libarbarian</h1>
            <img src={logo} alt="Logo"/>
            <div className="buttons-wrapper">
                <button>Sign In</button>
                <div>- OR -</div>
                <button>Create Account</button>
            </div>
        </div>
    )
}