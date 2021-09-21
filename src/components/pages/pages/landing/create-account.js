import React from 'react'

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function createAccount({ handleCreateAccount, handlePageChange, loading, username, setUsername, password, setPassword, passwordConfirm, setPasswordConfirm, error }) {
    return (
        <div className="form-wrapper create-account">
            <form onSubmit={handleCreateAccount}>
                <input 
                    type="text" 
                    autoCorrect="off" autoCapitalize="none"
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
                <button type="submit" disabled={loading}>Create Account</button>
            </form>
            <div className="error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
            <h4>Already have an account?</h4>
            <button onClick={() => handlePageChange("landing")} disabled={loading}>Sign In</button>
        </div>
    )
}