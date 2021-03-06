import React, { useState } from 'react'

import ManageShelves from "../pages/manage-shelves/manage-shelves"
import EditShelf from "../pages/manage-shelves/edit-shelf"

export default function manageShelves(props) {
    const [display, setDisplay] = useState(props.shelf.id ? "edit-shelf" : "manage-shelves")
    const [selectedShelf, setSelectedShelf] = useState(props.shelf ? props.shelf.id : {})
    
    const handleEdit = shelf => {
        setSelectedShelf(shelf)
        setDisplay("edit-shelf")
    }

    const renderDisplay = () => {
        switch(display) {
            case "manage-shelves": return (
                <ManageShelves 
                    user={props.user} 
                    updateUser={props.updateUser} 
                    handleEdit={handleEdit} 
                />
            )
            case "edit-shelf": return (
                <EditShelf 
                    selectedShelf={selectedShelf} 
                    setSelectedShelf={setSelectedShelf} 
                    updateUser={props.updateUser} 
                    user={props.user}
                    setDisplay={setDisplay} 
                />
            )
        }
    }

    return (
        <div className='manager-wrapper'>
            <h2>Manage Shelves</h2>
            <button onClick={() => props.setDisplay("bookcase")}>Done</button>
            {renderDisplay()}
        </div>
    )
}