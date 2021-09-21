import React, { useState } from 'react'

import Landing from "../pages/landing/landing"
import SignIn from "../pages/landing/sign-in"
import CreateAccount from "../pages/landing/create-account"

import logo from "../../../../static/assets/libarbarian.jpg"

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
        fetch(`https://librarianapi.herokuapp.com/user/${type}`, {
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
                <Landing 
                    loading={loading} 
                    handlePageChange={handlePageChange} 
                />
            )
            case "sign-in": return (
                <SignIn 
                    handleSignIn={handleSignIn} 
                    handlePageChange={handlePageChange} 
                    loading={loading} username={username} 
                    setUsername={setUsername} password={password} 
                    setPassword={setPassword} 
                />
            )
            case "create-account": return (
                <CreateAccount 
                    handleCreateAccount={handleCreateAccount} 
                    handlePageChange={handlePageChange} 
                    loading={loading} 
                    username={username} 
                    setUsername={setUsername} 
                    password={password} 
                    setPassword={setPassword} 
                    passwordConfirm={passwordConfirm} 
                    setPasswordConfirm={setPasswordConfirm} 
                />
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