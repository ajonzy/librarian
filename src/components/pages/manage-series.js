import React, { useState } from 'react'

export default function manageSeries(props) {
    const [display, setDisplay] = useState("manage-series")
    const [nameInput, setNameInput] = useState("")
    const [selectedSeries, setSelectedSeries] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleEdit = series => {
        setNameInput(series.name)
        setSelectedSeries(series)
        setDisplay("edit-series")
    }

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

            fetch(`http://127.0.0.1:5000/series/update/${selectedSeries.id}`, {
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
                    props.user.series = props.user.series.map(series => series.id === data.id ? data : series)
                    props.updateUser(props.user)
                }
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error updating series: ", error)
            })
        }
    }

    const handleDeleteSeries = deletedSeries => {
        fetch(`http://127.0.0.1:5000/shelf/delete/${deletedSeries.id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            props.user.series = props.user.series.filter(series => series.id !== data.id)
            props.updateUser(props.user)
        })
        .catch(error => console.log("Error deleting series: ", error))
    }

    const renderDisplay = () => {
        switch(display) {
            case "manage-series": return (
                props.user.series.map(series => (
                    <div className="series-wrapper" key={series.id}>
                        <h3>{series.name}</h3>
                        <div className="options-wrapper">
                            <div onClick={() => handleEdit(series)}>Edit</div>
                            <div onClick={() => handleDeleteShelf(series)}>Delete</div>
                        </div>
                    </div>
                ))
            )
            case "edit-series": return (
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
    }

    return (
        <div className='manager-wrapper'>
            <h2>Manage Series</h2>
            <button onClick={() => props.setDisplay("bookcase")}>Done</button>
            {renderDisplay()}
        </div>
    )
}