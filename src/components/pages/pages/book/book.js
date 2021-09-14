import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function book({ id, title, author, published_year, number_of_pages, thumbnail_url, read, rating, notes, series_data, shelves, setDisplay, handleChangeBookView,  handleViewShelf, handleScroll, user, updateUser }) {
    const [confirmDelete, setConfirmDelete] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const renderSeries = () => {
        const series = user.series.filter(series => series.id === series_data.id)[0]

        return series.books.map(book => <p key={book.id} onClick={() => handleChangeBookView(book)}>{book.title}</p>)
    }

    const renderShelves = () => {
        return shelves.map(shelf => shelf.name !== "All Books" ? (
            <p key={shelf.id} onClick={() => handleViewShelf(shelf)}>{shelf.name}</p>
         ) : null)
    }

    const handleDelete = () => {
        if (confirmDelete === "") {
            setConfirmDelete("Are you sure you want to delete this book?")
        }
        else {
            setConfirmDelete("")
            setError("")
            setLoading(true)

            fetch(`https://librarianapi.herokuapp.com/book/delete/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                updateUser(data.user)
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error updating book: ", error)
            })
        }
    }

    const handleEdit = () => {
        setDisplay("edit-book")
        handleScroll()
    }

    return (
        <div className="book">
            <div className="book-title-wrapper">
                <h2>{title}</h2>
                <h5>By</h5>
                <h3>{author ? author : "Unknown"}</h3>
            </div>
            <p>Published Year: {published_year ? published_year : "Unknown"}</p>
            <p>Number of Pages: {number_of_pages ? number_of_pages : "Unknown"}</p>
            {read ? <p style={{ color: "green" }}>Read <FontAwesomeIcon icon={faCheck} /></p> : <p style={{ color: "red" }}>Not Read</p>}
            {thumbnail_url ? <img src={thumbnail_url} alt=""/> : null}
            {rating ? <div className="book-rating-wrapper">
                <p>Rating</p>
                <p>{"\u2605".repeat(rating)}<span style={{ color: "grey" }}>{"\u2605".repeat(10 - rating)}</span></p>
            </div> : null}
            {notes !== "" && notes !== null ? <div className="book-notes-wrapper">
                <h4>Notes</h4>
                <p style={{ whiteSpace: "pre-line" }}>{notes}</p>
            </div> : null}
            {series_data ? <div className="book-series-wrapper">
                <h3>Series</h3>
                <h4>{series_data.name}</h4>
                {renderSeries()}
            </div> : null}
            {shelves.length > 1 ? <div className="book-shelves-wrapper">
                <h3>Shelves</h3>
                {renderShelves()}
            </div> : null}
            <div className="options-wrapper">
                <button disabled={loading} onClick={handleEdit}>Edit</button>
                <button disabled={loading} onClick={handleDelete} style={{ color: "red" }}>Delete</button>
            </div>
            <p className="confirm-error-loading">{confirmDelete}{error}{loading ? <img src={loadingImg} /> : null}</p>
        </div>
    )
}