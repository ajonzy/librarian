import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import Book from "../pages/book/book"
import EditBook from "../pages/book/edit-book"

export default function book(props) {
    const [display, setDisplay] = useState("book")

    const bookRef = useRef(null)

    const handleViewShelf = shelf => {
        props.handleViewBookCancel()
        props.handleViewShelf(shelf)
    }

    const handleScroll = () => {
        bookRef.current.scrollTop = 0
    }
    
    const renderDisplay = () => {
        switch(display) {
            case "book": return (
                <Book 
                    {...props.book} 
                    setDisplay={setDisplay} 
                    handleChangeBookView={props.handleChangeBookView} 
                    handleViewShelf={handleViewShelf} 
                    handleScroll={handleScroll}
                    user={props.user} 
                    updateUser={props.updateUser} 
                />
            )
            case "edit-book": return (
                <EditBook 
                    book={props.book} 
                    setDisplay={setDisplay} 
                    handleScroll={handleScroll}
                    user={props.user} 
                    updateUser={props.updateUser} 
                />
            )
        }
    }

    const handleBack = () => {
        if (display === "book") {
            props.handleViewBookCancel()
        }
        else {
            setDisplay("book")
        }
    }

    return (
        <div ref={bookRef} className='book-wrapper'>
            <button onClick={handleBack}><FontAwesomeIcon icon={faLongArrowAltLeft} /> Back</button>
            {renderDisplay()}
        </div>
    )
}