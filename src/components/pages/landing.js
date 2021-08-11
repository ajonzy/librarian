import React, { useState } from 'react'

import logo from "../../../static/assets/Libarbarian.jpg"

export default function landing() {
    const [display, setDisplay] = useState("landing")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const handleSignIn = event => {
        event.preventDefault()
    }

    const handleCreateAccount = event => {
        event.preventDefault()
    }

    const renderDisplay = () => {
        switch(display) {
            case "landing": return (
                <div className="buttons-wrapper">
                    <button onClick={() => setDisplay("sign-in")}>Sign In</button>
                    <div>- OR -</div>
                    <button onClick={() => setDisplay("create-account")}>Create Account</button>
                </div>
            )
            case "sign-in": return (
                <div className="form-wrapper">
                    <form onSubmit={handleSignIn}>
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    <button onClick={() => setDisplay("landing")}>&lt;- Back</button>
                </div>
            )
            case "create-account": return (
                <div className="form-wrapper">
                    <form onSubmit={handleCreateAccount}>
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Confirm Password"
                            value={passwordConfirm}
                            onChange={event => setPasswordConfirm(event.target.value)}
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    <button onClick={() => setDisplay("landing")}>&lt;- Back</button>
                </div>
            )
        }
    }

    return (
        <div className='landing-wrapper'>
            <h1>Welcome to<br/>Libarbarian</h1>
            <img src={logo} alt="Logo"/>
            {renderDisplay()}
        </div>
    )
}