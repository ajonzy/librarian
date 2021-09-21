import React from 'react'

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function landing({ handleSignIn, handlePageChange, loading, username, setUsername, password, setPassword, error }) {
    return (
        <div className="form-wrapper landing">
            <form onSubmit={handleSignIn}>
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
                <button type="submit" disabled={loading}>Sign In</button>
            </form>
            <div className="error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
            <h4>Don't have an account yet?</h4>
            <button onClick={() => handlePageChange("create-account")} disabled={loading}>Create Account</button>
        </div>
    )
}