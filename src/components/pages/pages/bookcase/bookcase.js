import React from 'react'

import Shelf from "../../../utitlities/shelf"

export default function ({ setDisplay, user, handleViewShelf }) {
    const renderShelves = () => {
        let shelves = [user.shelves[0]]
        switch (user.shelves_display) {
            case "most-books":
                shelves = shelves.concat(user.shelves.slice(1).sort((shelf1, shelf2) => shelf2.books.length - shelf1.books.length !== 0 ? shelf2.books.length - shelf1.books.length : shelf1.name < shelf2.name ? -1 : 1))
                break
            case "alphabetical":
                shelves = shelves.concat(user.shelves.slice(1).sort((shelf1, shelf2) => shelf1.name < shelf2.name ? -1 : 1))
                break
            case "custom":
                shelves = shelves.concat(user.shelves.slice(1).sort((shelf1, shelf2) => shelf1.position - shelf2.position))
                break
        }

        return shelves.map((shelf, index) => (
            <Shelf 
                key={shelf.id} 
                shelf={shelf}
                handleViewShelf={handleViewShelf}
                number={index % 6}
            />
        ))
    }

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