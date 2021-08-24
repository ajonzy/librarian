import React, { useState } from 'react'

import BookDisplay from "./book"

export default function shelf(props) {
    const [display, setDisplay] = useState("shelf")
    const [selectedBook, setSelectedBook] = useState({})

    const handleViewBook = book => {
        setSelectedBook(book)
        setDisplay("book")
    }

    const handleViewBookCancel = () => {
        setSelectedBook({})
        setDisplay("shelf")
    }

    const renderBooks = () => props.shelf.books.map(book => <div key={book.id} onClick={() => handleViewBook(book)}>{book.title}</div>)

    const renderDisplay = () => {
        switch(display) {
            case "shelf": return (
                <div className='shelf-display-wrapper'>
                    <h2>{props.shelf.name}</h2>
                    <button onClick={() => props.handleViewShelfCancel()}>Back</button>
                    {renderBooks()}
                </div>
            )
            case "book": return (
                <BookDisplay book={selectedBook} handleViewBookCancel={handleViewBookCancel} handleViewShelf={props.handleViewShelf} />
            )
        }
    }

    return (
        renderDisplay()
    )
}