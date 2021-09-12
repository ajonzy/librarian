import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'

import logo from "../../../static/assets/Book Stacks.png"
import title from "../../../static/assets/My Book Stacks.png"

export default function navbar(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleDropdownSelect = selection => {
        setDropdownOpen(false)
        props.setDisplay(selection)
    }

    return (
        <div className='navbar-wrapper'>
            <div className="navbar-contents">
                <div className="logo-wrapper">
                    <img id="logo" src={logo} alt=""/>
                    <img id="title" src={title} alt=""/>
                </div>

                <div className="user-wrapper">
                    <FontAwesomeIcon icon={faBars} onClick={() => setDropdownOpen(!dropdownOpen)} />
                </div>
            </div>

            <div className={`account-dropdown ${dropdownOpen ? "open" : "closed"}`}>
                <h4>Welcome, {props.user.username[0].toUpperCase() + props.user.username.slice(1)}</h4>
                <div className={props.display === "bookcase" ? "active" : ""} onClick={() => handleDropdownSelect("bookcase")}>My Books</div>
                <div className={props.display === "manage-shelves" ? "active" : ""} onClick={() => handleDropdownSelect("manage-shelves")}>Manage Shelves</div>
                <div className={props.display === "manage-series" ? "active" : ""} onClick={() => handleDropdownSelect("manage-series")}>Manage Series</div>
                <div className={props.display === "wishlist" ? "active" : ""} onClick={() => handleDropdownSelect("wishlist")}>Wishlist</div>
                <div onClick={props.handleSuccessfulLogout}><FontAwesomeIcon icon={faSignOutAlt} /></div>
            </div>
        </div>
    )
}