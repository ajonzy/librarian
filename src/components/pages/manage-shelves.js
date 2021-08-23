import React, { useState } from 'react'

export default function manageShelves(props) {
    const [display, setDisplay] = useState("manage-shelves")
    const [nameInput, setNameInput] = useState("")
    const [selectedShelf, setSelectedShelf] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

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

    const handleEditShelf = () => {
        event.preventDefault()
        setError("")

        if (nameInput === "") {
            setError("Please enter a name")
        }
        else {
            setLoading(true)

            const formattedName = nameInput
                                  .split(" ")
                                  .map(word => word[0].toUpperCase() + word.slice(1))
                                  .join(" ")

            fetch(`http://127.0.0.1:5000/shelf/update/${selectedShelf.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name: formattedName })
            })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if (typeof data === "string") {
                    console.log(data)
                    if (data === "Error: Shelf already exists") {
                        setError("Shelf already exists")
                    }
                }
                else {
                    setNameInput("")
                    setSelectedShelf({})
                    setDisplay("manage-shelves")
                    props.user.shelves = props.user.shelves.map(shelf => shelf.id === data.id ? data : shelf)
                    props.updateUser(props.user)
                }
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error updating shelf: ", error)
            })
        }
    }

    const handleDeleteShelf = deletedShelf => {
        fetch(`http://127.0.0.1:5000/shelf/delete/${deletedShelf.id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            props.user.shelves = props.user.shelves.filter(shelf => shelf.id !== data.id)
            props.updateUser(props.user)
        })
        .catch(error => console.log("Error deleting shelf: ", error))
    }

    const renderDisplay = () => {
        switch(display) {
            case "manage-shelves": return (
                props.user.shelves.map(shelf => (
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
            case "edit-shelf": return (
                <form onSubmit={handleEditShelf}>
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