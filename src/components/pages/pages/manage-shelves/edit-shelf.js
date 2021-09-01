import React, { useState } from 'react'

export default function editShelf({ selectedShelf, setSelectedShelf, setDisplay, updateUser }) {
    const [nameInput, setNameInput] = useState(selectedShelf.name)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleFormCancel = () => {
        setError("")
        setNameInput("")
        setSelectedShelf({})
        setLoading(false)
        setDisplay("manage-shelves")
    }

    const handleEditShelf = event => {
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

            fetch(`https://librarianapi.herokuapp.com/shelf/update/${selectedShelf.id}`, {
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
                    updateUser(data.user)
                }
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error updating shelf: ", error)
            })
        }
    }

    return (
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