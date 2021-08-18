import React from 'react'

import Navbar from "../utitlities/navbar"

export default function bookcase(props) {
    return (
        <div className='bookcase-wrapper'>
            <Navbar user={props.user} handleSuccessfulLogout={props.handleSuccessfulLogout} />
            
        </div>
    )
}