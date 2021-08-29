import React from 'react'

export default function manageSeries({ user, updateUser, handleEdit }) {
    const handleDeleteSeries = deletedSeries => {
        fetch(`http://127.0.0.1:5000/series/delete/${deletedSeries.id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => updateUser(data.user))
        .catch(error => console.log("Error deleting series: ", error))
    }

    return (
        user.series.map(series => (
            series.name !== "All Books" 
            ?
            <div className="series-wrapper" key={series.id}>
                <h3>{series.name}</h3>
                <div className="options-wrapper">
                    <div onClick={() => handleEdit(series)}>Edit</div>
                    <div onClick={() => handleDeleteSeries(series)}>Delete</div>
                </div>
            </div>
            :
            null
        ))
    )
}