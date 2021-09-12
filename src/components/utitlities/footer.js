import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function footer(props) {
    return (
        <div className="footer-wrapper">
            <div className={`footer-button ${props.display === "add-book" ? "active" : ""}`} onClick={() => props.setDisplay("add-book")}>
                <span>Add&nbsp;Book</span>
                <FontAwesomeIcon icon={faBook} />
            </div>

            <div className={`footer-button ${props.display === "search" ? "active" : ""}`} onClick={() => props.setDisplay("search")}>
                <span>Search</span>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    )
}