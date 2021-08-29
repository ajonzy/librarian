import React from 'react'

import Shelf from "../../../utitlities/shelf"

export default function ({ setDisplay, user, handleViewShelf }) {
    const renderShelves = () => user.shelves.map(shelf => (
        <Shelf 
            key={shelf.id} 
            shelf={shelf}
            handleViewShelf={handleViewShelf}
        />
    ))

    return (
        <div className="shelves-wrapper">
            <div className="add-shelf-wrapper">
                <h3 onClick={() => setDisplay("add-shelf")}>Add Shelf</h3>
            </div>
            {renderShelves()}
        </div>
    )
}