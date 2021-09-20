import React, { useState } from 'react'

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function manageSeries({ user, updateUser, handleEdit, handleViewBook }) {
    const [selectedSeries, setSelectedSeries] = useState({})
    const [confirmDelete, setConfirmDelete] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    const handleDeleteSeries = deletedSeries => {
        if (confirmDelete === "" || selectedSeries.id !== deletedSeries.id) {
            setSelectedSeries(deletedSeries)
            setConfirmDelete("Are you sure you want to delete this series?")
        }
        else {
            setConfirmDelete("")
            setError("")
            setLoading(true)

            fetch(`https://librarianapi.herokuapp.com/series/delete/${deletedSeries.id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                updateUser(data.user)
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error deleting series: ", error)
            })
        }
    }

    const renderSeries = () => {
        const series = user.series.sort((series1, series2) => series1.name < series2.name ? -1 : 1)

        return series.map(series => (
            <div className="series-wrapper" key={series.id}>
                <h3>{series.name}</h3>
                {renderBooks(series)}
                <div className="options-wrapper">
                    <button onClick={() => handleEdit(series)}>Edit</button>
                    <button onClick={() => handleDeleteSeries(series)} style={{ color: "red" }}>Delete</button>
                </div>
                <p className="confirm-error-loading">{series.id === selectedSeries.id ? confirmDelete : ""}{series.id === selectedSeries.id ? error : ""}{series.id === selectedSeries.id && loading ? <img src={loadingImg} /> : null}</p>
            </div>
        ))
    }

    const renderBooks = series => {
        let books = []
        books = books.concat(series.books.filter(book => book.series_position !== null).sort((book1, book2) => book1.series_position - book2.series_position))
        books = books.concat(series.books.filter(book => book.series_position === null).sort((book1, book2) => book1.title < book2.title ? -1 : 1))

        return (
            <div className="series-books-display">
                {books.map(book => (
                    <div key={book.id} className="series-book-display" onClick={() => handleViewBook(book, user)}>
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="manage-series-wrapper">
            {renderSeries()}
        </div>
    )
}