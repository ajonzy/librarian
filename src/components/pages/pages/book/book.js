import React, { useState } from 'react'

export default function book({ id, title, author, published_year, number_of_pages, thumbnail_url, read, rating, notes, series_data, shelves, setDisplay, handleChangeBookView, handleViewBookCancel, handleViewShelf, user, updateUser }) {
    const [confirmDelete, setConfirmDelete] = useState("")

    const renderSeries = () => {
        const series = user.series.filter(series => series.id === series_data.id)[0]

        return (
            <ul>{series.books.map(book => (
                <li key={book.id} onClick={() => handleChangeBookView(book)}>{book.title}</li>
            ))}</ul>
        )
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
            fetch(`https://librarianapi.herokuapp.com/book/delete/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => updateUser(data.user))
            .catch(error => console.log("Error deleting book: ", error))
        }
    }

    return (
        <div className="book">
            <button onClick={() => handleViewBookCancel()}>Back</button>
            <h2>{title}</h2>
            <h5>By</h5>
            <h3>{author}</h3>
            <p>Published: {published_year ? published_year : "Unknown"}</p>
            <p>Pages: {number_of_pages ? number_of_pages : "Unknown"}</p>
            <p>Read: <input type="checkbox" checked={read} disabled /></p>
            {thumbnail_url ? <img src={thumbnail_url} alt=""/> : null}
            {rating ? <p>Rating: {"\u2605".repeat(rating)}<span style={{ color: "grey" }}>{"\u2605".repeat(10 - rating)}</span></p> : null}
            {notes !== "" ? <p style={{ whiteSpace: "pre-line" }}>Notes: {notes}</p> : null}
            {series_data ? <h3>Series</h3> : null}
            {series_data ? <h4>{series_data.name}</h4> : null}
            {series_data ? renderSeries() : null}
            {shelves.length > 1 ? <h3>Shelves</h3> : null}
            {renderShelves()}
            <div className="options-wrapper">
                <div onClick={() => setDisplay("edit-book")}>Edit</div>
                <div onClick={handleDelete}>Delete</div>
                <p>{confirmDelete}</p>
            </div>
        </div>
    )
}