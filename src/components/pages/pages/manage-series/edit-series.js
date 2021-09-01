import React, { useState } from 'react'

export default function editSeries({ selectedSeries, setSelectedSeries, setDisplay, updateUser }) {
    const [nameInput, setNameInput] = useState(selectedSeries.name)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleFormCancel = () => {
        setError("")
        setNameInput("")
        setSelectedSeries({})
        setLoading(false)
        setDisplay("manage-series")
    }

    const handleEditSeries = event => {
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

            fetch(`https://librarianapi.herokuapp.com/series/update/${selectedSeries.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name: formattedName })
            })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if (typeof data === "string") {
                    console.log(data)
                    if (data === "Error: Series already exists") {
                        setError("Series already exists")
                    }
                }
                else {
                    setNameInput("")
                    setSelectedSeries({})
                    setDisplay("manage-series")
                    updateUser(data.user)
                }
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error updating series: ", error)
            })
        }
    }

    return (
        <form onSubmit={handleEditSeries}>
            <input type="text" placeholder="Series Name" value={nameInput} onChange={event => setNameInput(event.target.value)}/>
            <div className="buttons-wrapper">
                <button type="submit" disabled={loading}>Edit Series</button>
                <button onClick={handleFormCancel}>Cancel</button>
            </div>
            <div>{error}</div>
        </form>
    )
}