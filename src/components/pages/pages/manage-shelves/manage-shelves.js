import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function manageShelves({ user, updateUser, handleEdit }) {
    const [displaySelection, setDisplaySelection] = useState(user.shelves_display)
    const [selectedShelf, setSelectedShelf] = useState({})
    const [confirmDelete, setConfirmDelete] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleDisplayUpdate = event => {
        event.preventDefault()

        setSelectedShelf({})
        setLoading(true)
        setError("")

        fetch(`https://librarianapi.herokuapp.com/user/update/shelves_display/${user.id}`, { 
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ shelves_display: displaySelection }) 
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false)
            updateUser(data)
        })
        .catch(error => {
            setError("An error occured... Please try again later.")
            setLoading(false)
            console.log("Error updating user: ", error)
        })
    }

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
                console.log("Error deleting shelf: ", error)
            })
        }
    }

    return (
        <div className="shelves-manager">
            <div className="shelf-display-options-wrapper">
                <h3>Shelf Sort</h3>
                <form onSubmit={handleDisplayUpdate}>
                    <label>
                        Most&nbsp;Books
                        <input 
                            type="radio" 
                            defaultChecked={displaySelection === "most-books"} 
                            name="display-option"
                            onChange={() => setDisplaySelection("most-books")}
                            style={{ display: "none" }}
                        />
                        <FontAwesomeIcon icon={displaySelection === "most-books" ? faDotCircle : faCircle} />
                    </label>

                    <label>
                        Alphabetical
                        <input 
                            type="radio" 
                            defaultChecked={displaySelection === "alphabetical"} 
                            name="display-option"
                            onChange={() => setDisplaySelection("alphabetical")}
                            style={{ display: "none" }}
                        />
                        <FontAwesomeIcon icon={displaySelection === "alphabetical" ? faDotCircle : faCircle} />
                    </label>

                    <label>
                        Custom
                        <input 
                            type="radio" 
                            defaultChecked={displaySelection === "custom"} 
                            name="display-option"
                            onChange={() => setDisplaySelection("custom")}
                            style={{ display: "none" }}
                        />
                        <FontAwesomeIcon icon={displaySelection === "custom" ? faDotCircle : faCircle} />
                    </label>

                    <button type="submit" disabled={displaySelection === user.shelves_display}>Update</button>
                    <p className="error-loading">{ selectedShelf.id === undefined ? error : ""}{selectedShelf.id === undefined && loading ? <img src={loadingImg} /> : null}</p>
                </form>
            </div>

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