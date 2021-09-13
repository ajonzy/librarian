import React, { useState } from 'react'

export default function addShelf({ setDisplay, user, updateUser }) {
    const [nameInput, setNameInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleAddShelf = event => {
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

            fetch("https://librarianapi.herokuapp.com/shelf/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name: formattedName,
                    user_id: user.id
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
                    setDisplay("bookcase")
                    updateUser(data.user)
                }
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error adding shelf: ", error)
            })
        }
    }

    const handleFormCancel = () => {
        setError("")
        setNameInput("")
        setLoading(false)
        setDisplay("bookcase")
    }

    return (
        <form className="add-shelf-form" onSubmit={handleAddShelf}>
            <input type="text" placeholder="Shelf Name" onChange={event => setNameInput(event.target.value)}/>
            <div className="options-wrapper">
                <button type="submit" disabled={loading}>Add Shelf</button>
                <button onClick={handleFormCancel}>Cancel</button>
            </div>
            <div className="error">{error}</div>
        </form>
    )
}