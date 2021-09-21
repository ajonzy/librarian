import React from 'react'

export default function landing({ handlePageChange, loading }) {
    return (
        <div className="buttons-wrapper">
            <button onClick={() => handlePageChange("sign-in")} disabled={loading}>Sign In</button>
            <div>- OR -</div>
            <button onClick={() => handlePageChange("create-account")} disabled={loading}>Create Account</button>
        </div>
    )
}