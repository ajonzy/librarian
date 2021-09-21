import React from 'react'

export default function ({ handleCreateAccount, handlePageChange, loading, username, setUsername, password, setPassword, passwordConfirm, setPasswordConfirm }) {
    return (
        <div className="form-wrapper">
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
            <button onClick={() => handlePageChange("landing")}>&lt;- Back</button>
        </div>
    )
}