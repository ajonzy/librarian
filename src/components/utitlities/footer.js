import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function footer(props) {
    return (
        <div className="footer-wrapper">
            <div className="add-book-wrapper" onClick={() => props.setDisplay("add-book")}>
                <span>Add&nbsp;Book</span>
                <FontAwesomeIcon icon={faBook} />
            </div>

            <div className="search-wrapper" onClick={() => props.setDisplay("search")}>
                <span>Search</span>
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    )
}