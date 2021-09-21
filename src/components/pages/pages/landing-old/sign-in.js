import React from 'react'

export default function signIn({ handleSignIn, handlePageChange, loading, username, setUsername, password, setPassword }) {
    return (
        <div className="form-wrapper">
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
            <button onClick={() => handlePageChange("landing")}>&lt;- Back</button>
        </div>
    )
}