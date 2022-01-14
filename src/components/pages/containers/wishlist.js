import React, { useState } from 'react'

import Wishlist from "../pages/wishlist/wishlist"
import BookDisplay from "./book"

export default function shelf(props) {
    const [display, setDisplay] = useState(props.selectedBook.id > 0 ? "book" : "wishlist")
    const [selectedBook, setSelectedBook] = useState(props.selectedBook)

    const handleViewBook = book => {
        setSelectedBook(book)
        setDisplay("book")
    }

    const handleChangeBookView = book => {
        setSelectedBook(book)
    }

    const handleViewBookCancel = () => {
        setSelectedBook({})
        setDisplay("wishlist")
    }

    const updateUser = user => {
        const updatedBook = selectedBook.id ? user.books.filter(book => book.id === selectedBook.id)[0] || {} : {}
        if (updatedBook.id === undefined) {
            setDisplay("wishlist")
        }
        setSelectedBook(updatedBook)
        props.updateUser(user)
    }

    const renderDisplay = () => {
        switch(display) {
            case "wishlist": return (
                <Wishlist 
                    books={props.user.books.filter(book => book.owned === false)} 
                    handleViewBook={handleViewBook} 
                    handleViewWishlistCancel={props.handleViewWishlistCancel} 
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