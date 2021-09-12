import React from 'react'

import Shelf from "../../../utitlities/shelf"

export default function ({ setDisplay, user, handleViewShelf }) {
    const renderShelves = () => user.shelves.map((shelf, index) => (
        <Shelf 
            key={shelf.id} 
            shelf={shelf}
            handleViewShelf={handleViewShelf}
            number={index % 6}
        />
    ))

    return (
        <div className="bookcase">
            <div className="shelves-wrapper">
                <div className="add-shelf-wrapper" onClick={() => setDisplay("add-shelf")}>
                    <h3>Add Shelf</h3>
                </div>
                {renderShelves()}
            </div>
        </div>
    )
}