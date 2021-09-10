import React, { useState } from 'react'

import Navbar from "../../utitlities/navbar"
import Bookcase from "../pages/bookcase/bookcase"
import AddShelf from "../pages/bookcase/add-shelf"
import ManageShelves from "./manage-shelves"
import ManageSeries from "./manage-series"
import Shelf from "./shelf"
import AddBook from "./add-book"
import Search from "./search"
import Footer from "../../utitlities/footer"

export default function bookcase(props) {
    const [display, setDisplay] = useState("bookcase")
    const [selectedShelf, setSelectedShelf] = useState({})
    const [selectedBook, setSelectedBook] = useState({})

    const handleViewShelf = shelf => {
        setSelectedShelf(shelf)
        setSelectedBook({})
        setDisplay("shelf")
    }

    const handleViewNestedShelf = nestedShelf => {
        const shelf = props.user.shelves.filter(shelf => shelf.id === nestedShelf.id)[0]
        setSelectedShelf(shelf)
        setSelectedBook({})
        setDisplay("shelf")
    }

    const handleViewShelfCancel = () => {
        setSelectedShelf({})
        setSelectedBook({})
        setDisplay("bookcase")
    }

    const handleViewBook = (book, userData) => {
        setSelectedBook(book)
        setSelectedShelf(userData.shelves.filter(shelf => shelf.name === "All Books")[0])
        setDisplay("shelf")
    }

    const updateUser = user => {
        const updatedShelf = selectedShelf.id ? user.shelves.filter(shelf => shelf.id === selectedShelf.id)[0] : {}
        const updatedBook = selectedBook.id ? user.books.filter(book => book.id === selectedBook.id)[0] : {}
        setSelectedShelf(updatedShelf)
        setSelectedBook(updatedBook)
        props.updateUser(user)
    }

    const renderDisplay = () => {
        switch(display) {
            case "bookcase": return (
                <Bookcase 
                    user={props.user} 
                    setDisplay={setDisplay} 
                    handleViewShelf={handleViewShelf} 
                />
            )
            case "add-shelf": return (
                <AddShelf 
                    user={props.user} 
                    updateUser={updateUser} 
                    setDisplay={setDisplay} 
                />
            )
            case "manage-shelves": return (
                <ManageShelves 
                    user={props.user} 
                    updateUser={updateUser} 
                    setDisplay={setDisplay} 
                />
            )
            case "manage-series": return (
                <ManageSeries 
                    user={props.user} 
                    updateUser={updateUser} 
                    setDisplay={setDisplay} 
                />
            )
            case "shelf": return (
                <Shelf
                    shelf={selectedShelf} 
                    selectedBook={selectedBook}
                    handleViewShelfCancel={handleViewShelfCancel} 
                    handleViewShelf={handleViewNestedShelf} 
                    user={props.user} 
                    updateUser={updateUser}
                />
            )
            case "add-book": return (
                <AddBook
                    setDisplay={setDisplay}
                    user={props.user} 
                    updateUser={updateUser}
                    handleViewBook={handleViewBook}
                />
            )
            case "search": return (
                <Search
                    setDisplay={setDisplay}
                    user={props.user} 
                    handleViewBook={handleViewBook}
                />
            )
        }
    }

    return (
        <div className='bookcase-wrapper'>
            <Navbar 
                user={props.user} 
                handleSuccessfulLogout={props.handleSuccessfulLogout} 
                setDisplay={setDisplay} 
            />
            {renderDisplay()}
            <Footer setDisplay={setDisplay} />
        </div>
    )
}