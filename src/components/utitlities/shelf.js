import React from 'react'

export default function shelf(props) {
    return (
        <div className={`shelf-wrapper n${props.number}`} onClick={() => props.handleViewShelf(props.shelf)}>
            <div className="shelf-info">
                <h3>{props.shelf.name}</h3>
                <h4>({props.shelf.books.length})</h4>
            </div>
        </div>
    )
}