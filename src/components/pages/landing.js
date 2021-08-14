import React, { useState } from 'react'

import logo from "../../../static/assets/Libarbarian.jpg"

export default function landing(props) {
    const [display, setDisplay] = useState("landing")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handlePageChange = display => {
        setUsername("")
        setPassword("")
        setPasswordConfirm("")
        setError("")
        setDisplay(display)
    }

    const handleAuth = type => {
        fetch(`http://127.0.0.1:5000/user/${type}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false)
            if (typeof data === "string") {
                console.log(data)
                if (data === "Invalid Credentials") {
                    setError("Incorrect username or password")
                }
            }
            else {
                props.handleSuccessfulAuth(data)
            }
        })
        .catch(error => {
            setError("An error occured... Please try again later.")
            setLoading(false)
            console.log("Error authenticating account: ", error)
        })
    }

    const handleSignIn = event => {
        event.preventDefault()

        if (username === "" || password === "") {
            setError("Please fill out all fields")
        }
        else {
            setError("")
            setLoading(true)
            handleAuth("login")
        }
    }

    const handleCreateAccount = event => {
        event.preventDefault()

        if (username === "" || password === "" || passwordConfirm === "") {
            setError("Please fill out all fields")
        }
        else if (password !== passwordConfirm) {
            setError("Passwords do not match")
        }
        else {
            setError("")
            setLoading(true)
            handleAuth("add")
        }
    }

    const renderDisplay = () => {
        switch(display) {
            case "landing": return (
                <div className="buttons-wrapper">
                    <button onClick={() => handlePageChange("sign-in")} disabled={loading}>Sign In</button>
                    <div>- OR -</div>
                    <button onClick={() => handlePageChange("create-account")} disabled={loading}>Create Account</button>
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
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    <button onClick={() => handlePageChange("landing")}>&lt;- Back</button>
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
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password"
                            value={passwordConfirm}
                            onChange={event => setPasswordConfirm(event.target.value)}
                        />
                        <button type="submit">Create Account</button>
                    </form>
                    <button onClick={() => handlePageChange("landing")}>&lt;- Back</button>
                </div>
            )
        }
    }

    return (
        <div className='landing-wrapper'>
            <h1>Welcome to<br/>Libarbarian</h1>
            <img src={logo} alt="Logo"/>
            {renderDisplay()}
            <div>{error}</div>
        </div>
    )
}