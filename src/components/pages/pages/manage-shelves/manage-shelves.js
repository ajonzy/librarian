import React, { useState } from 'react'

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function manageShelves({ user, updateUser, handleEdit }) {
    const [selectedShelf, setSelectedShelf] = useState("")
    const [confirmDelete, setConfirmDelete] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    const handleDeleteShelf = deletedShelf => {
        if (confirmDelete === "" || selectedShelf.id !== deletedShelf.id) {
            setSelectedShelf(deletedShelf)
            setConfirmDelete("Are you sure you want to delete this shelf?")
        }
        else {
            setConfirmDelete("")
            setError("")
            setLoading(true)

            fetch(`https://librarianapi.herokuapp.com/shelf/delete/${deletedShelf.id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                updateUser(data.user)
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error updating book: ", error)
            })
        }
    }

    return (
        <div className="shelves-manager">
            {user.shelves.map(shelf => (
                shelf.name !== "All Books" 
                ?
                <div className="shelf-manager" key={shelf.id}>
                    <h3>{shelf.name}</h3>
                    <div className="options-wrapper">
                        <button disabled={shelf.id === selectedShelf.id ? loading : false} onClick={() => handleEdit(shelf)}>Edit</button>
                        <button disabled={shelf.id === selectedShelf.id ? loading : false} onClick={() => handleDeleteShelf(shelf)}>Delete</button>
                    </div>
                    <p className="confirm-error-loading">{shelf.id === selectedShelf.id ? confirmDelete : ""}{shelf.id === selectedShelf.id ? error : ""}{shelf.id === selectedShelf.id && loading ? <img src={loadingImg} /> : null}</p>
                </div>
                :
                null
            ))}
        </div>
    )
}