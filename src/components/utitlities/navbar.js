import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import logo from "../../../static/assets/libarbarian.jpg"

export default function navbar(props) {
    return (
        <div className='navbar-wrapper'>
            <div className="logo-wrapper">
                <img src={logo} alt=""/>
                <div>MyBookStack</div>
            </div>

            <div className="user-wrapper">
                <div>Welcome, {props.user.username}</div>
                <div className="account-dropdown">
                    <div onClick={() => props.setDisplay("manage-shelves")}>Manage Shelves</div>
                    <div onClick={() => props.setDisplay("manage-series")}>Manage Series</div>
                    <FontAwesomeIcon icon={faSignOutAlt} onClick={props.handleSuccessfulLogout} />
                </div>
            </div>
        </div>
    )
}