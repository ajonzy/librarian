import React, { useState } from 'react'

import BookDisplay from "./book"

export default function shelf(props) {
    const [display, setDisplay] = useState("shelf")
    const [selectedBook, setSelectedBook] = useState({})

    const handleViewBook = book => {
        setSelectedBook(book)
        setDisplay("book")
    }

    const handleChangeBookView = book => {
        setSelectedBook(book)
    }

    const handleViewBookCancel = () => {
        setSelectedBook({})
        setDisplay("shelf")
    }

    const renderBooks = () => props.shelf.books.map(book => <div key={book.id} onClick={() => handleViewBook(book)}>{book.title}</div>)

    const renderDisplay = () => {
        switch(display) {
            case "shelf": return (
                <div className='shelf-display'>
                    <h2>{props.shelf.name}</h2>
                    <button onClick={() => props.handleViewShelfCancel()}>Back</button>
                    {renderBooks()}
                </div>
            )
            case "book": return (
                <BookDisplay 
                    book={selectedBook} 
                    handleViewBookCancel={handleViewBookCancel}
                    handleChangeBookView={handleChangeBookView} 
                    handleViewShelf={props.handleViewShelf} 
                    series={props.series} 
                />
            )
        }
    }

    return (
        <div className="shelf-display-wrapper">
            {renderDisplay()}
        </div>
    )
}