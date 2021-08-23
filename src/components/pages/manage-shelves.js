import React, { useState, useEffect } from 'react'

export default function manageShelves(props) {
    const {
        display,
        loading,
        setLoading,
        error,
        setError
    } = props
    const setDisplay = props.setManageShelvesDisplay
    const [nameInput, setNameInput] = useState("")
    const [selectedShelf, setSelectedShelf] = useState({})

    const handleEdit = shelf => {
        setNameInput(shelf.name)
        setSelectedShelf(shelf)
        setDisplay("edit-shelf")
    }

    const handleFormCancel = () => {
        setError("")
        setNameInput("")
        setSelectedShelf({})
        setLoading(false)
        setDisplay("manage-shelves")
    }

    const renderDisplay = () => {
        switch(display) {
            case "manage-shelves": return (
                props.shelves.map(shelf => (
                    shelf.name !== "All Books" 
                    ?
                    <div className="shelf-wrapper" key={shelf.id}>
                        <h3>{shelf.name}</h3>
                        <div className="options-wrapper">
                            <div onClick={() => handleEdit(shelf)}>Edit</div>
                            <div onClick={() => props.handleDeleteShelf(shelf)}>Delete</div>
                        </div>
                    </div>
                    :
                    null
                ))
            )
            case "edit-shelf": return (
                <form onSubmit={() => props.handleEditShelf(selectedShelf, nameInput)}>
                    <input type="text" placeholder="Shelf Name" value={nameInput} onChange={event => setNameInput(event.target.value)}/>
                    <div className="buttons-wrapper">
                        <button type="submit" disabled={loading}>Edit Shelf</button>
                        <button onClick={handleFormCancel}>Cancel</button>
                    </div>
                    <div>{error}</div>
                </form>
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