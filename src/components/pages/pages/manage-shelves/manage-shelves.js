import React from 'react'

export default function manageShelves({ user, updateUser, handleEdit }) {
    const handleDeleteShelf = deletedShelf => {
        fetch(`https://librarianapi.herokuapp.com/shelf/delete/${deletedShelf.id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => updateUser(data.user))
        .catch(error => console.log("Error deleting shelf: ", error))
    }

    return (
        user.shelves.map(shelf => (
            shelf.name !== "All Books" 
            ?
            <div className="shelf-wrapper" key={shelf.id}>
                <h3>{shelf.name}</h3>
                <div className="options-wrapper">
                    <div onClick={() => handleEdit(shelf)}>Edit</div>
                    <div onClick={() => handleDeleteShelf(shelf)}>Delete</div>
                </div>
            </div>
            :
            null
        ))
    )
}