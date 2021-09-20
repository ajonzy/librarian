import React, { useState } from 'react'

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function editShelf({ selectedShelf, setSelectedShelf, setDisplay, user, updateUser }) {
    const [nameInput, setNameInput] = useState(selectedShelf.name)
    const [positionInput, setPositionInput] = useState(selectedShelf.position)
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
                                  .trim()
                                  .split(" ")
                                  .map(word => word[0].toUpperCase() + word.slice(1))
                                  .join(" ")

            const formattedPosition = positionInput < 1 && !isNaN(positionInput)
                                      ? 1 
                                      : positionInput > user.shelves.length - 1 && !isNaN(positionInput)
                                        ? user.shelves.length - 1 
                                        : positionInput

            fetch(`https://librarianapi.herokuapp.com/shelf/update/${selectedShelf.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ 
                    name: formattedName,
                    position: !isNaN(positionInput) ? formattedPosition : selectedShelf.position
                })
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
        <div className="shelf-manager-wrapper">
            <form onSubmit={handleEditShelf}>
                <input type="text" placeholder="Shelf Name" value={nameInput} onChange={event => setNameInput(event.target.value)}/>
                <div className="buttons-wrapper">
                    <button type="submit" disabled={loading}>Edit Shelf</button>
                    <button onClick={handleFormCancel}>Cancel</button>
                </div>
                <div className="error error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
            </form>

            {user.shelves_display === "custom" ?
            <input 
                type="number"
                placeholder={selectedShelf.position}
                value={isNaN(positionInput) ? "" : positionInput}
                onChange={event => setPositionInput(event.target.valueAsNumber)}
            /> : null}
        </div>
    )
}