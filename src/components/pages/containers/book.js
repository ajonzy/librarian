import React, { useState } from 'react'

import Book from "../pages/book/book"
import EditBook from "../pages/book/edit-book"

export default function book(props) {
    const [display, setDisplay] = useState("book")

    const handleViewShelf = shelf => {
        props.handleViewBookCancel()
        props.handleViewShelf(shelf)
    }
    
    const renderDisplay = () => {
        switch(display) {
            case "book": return (
                <Book 
                    {...props.book} 
                    setDisplay={setDisplay} 
                    handleChangeBookView={props.handleChangeBookView} 
                    handleViewBookCancel={props.handleViewBookCancel} 
                    handleViewShelf={handleViewShelf} 
                    user={props.user} 
                />
            )
            case "edit-book": return (
                <EditBook 
                    book={props.book} 
                    setDisplay={setDisplay} 
                    user={props.user} 
                    updateUser={props.updateUser} 
                />
            )
        }
    }

    return (
        <div className='book-wrapper'>
            {renderDisplay()}
        </div>
    )
}