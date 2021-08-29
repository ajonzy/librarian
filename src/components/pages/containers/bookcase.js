import React, { useState } from 'react'

import Navbar from "../../utitlities/navbar"
import Bookcase from "../pages/bookcase/bookcase"
import AddShelf from "../pages/bookcase/add-shelf"
import ManageShelves from "./manage-shelves"
import ManageSeries from "./manage-series"
import Shelf from "./shelf"

export default function bookcase(props) {
    const [display, setDisplay] = useState("bookcase")
    const [selectedShelf, setSelectedShelf] = useState({})

    const handleViewShelf = shelf => {
        setSelectedShelf(shelf)
        setDisplay("shelf")
    }

    const handleViewNestedShelf = nestedShelf => {
        const shelf = props.user.shelves.filter(shelf => shelf.id === nestedShelf.id)[0]
        setSelectedShelf(shelf)
        setDisplay("shelf")
    }

    const handleViewShelfCancel = () => {
        setSelectedShelf({})
        setDisplay("bookcase")
    }

    const updateUser = user => {
        const updatedShelf = selectedShelf.id ? user.shelves.filter(shelf => shelf.id === selectedShelf.id)[0] : {}
        setSelectedShelf(updatedShelf)
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
                    handleViewShelfCancel={handleViewShelfCancel} 
                    handleViewShelf={handleViewNestedShelf} 
                    user={props.user} 
                    updateUser={updateUser}
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
        </div>
    )
}