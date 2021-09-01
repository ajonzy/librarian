import React, { useState } from 'react'

import Shelf from "../pages/shelf/shelf"
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

    const updateUser = user => {
        const updatedBook = selectedBook.id ? user.books.filter(book => book.id === selectedBook.id)[0] : {}
        setSelectedBook(updatedBook)
        props.updateUser(user)
    }

    const renderDisplay = () => {
        switch(display) {
            case "shelf": return (
                <Shelf 
                    shelf={props.shelf} 
                    handleViewBook={handleViewBook} 
                    handleViewShelfCancel={props.handleViewShelfCancel} 
                />
            )
            case "book": return (
                <BookDisplay 
                    book={selectedBook} 
                    handleViewBookCancel={handleViewBookCancel}
                    handleChangeBookView={handleChangeBookView} 
                    handleViewShelf={props.handleViewShelf} 
                    user={props.user}
                    updateUser={updateUser}
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