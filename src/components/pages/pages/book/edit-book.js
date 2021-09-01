import React, { useState } from 'react'

import BookForm from "../../../utitlities/book-form"

export default function editBook({ book, setDisplay, user, updateUser }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleEditSubmit = editData => {
        if (error === "") {
            fetch(`https://librarianapi.herokuapp.com/book/update/${book.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    title: editData.titleInput,
                    author: editData.authorInput,
                    published_year: editData.publishedYearInput,
                    number_of_pages: editData.numberOfPagesInput,
                    thumbnail_url: editData.thumbnailUrlInput,
                    read: editData.readInput,
                    rating: editData.ratingInput,
                    notes: editData.notesInput,
                    series_id: editData.series ? editData.series.id : null,
                    shelves_ids: editData.shelvesIds
                })
            })
            .then(response => response.json())
            .then(data => {
                updateUser(data.user)
                setLoading(false)
                setDisplay("book")
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error updating book: ", error)
            })
        }
    }

    return (
        <div className="edit-book">
            <BookForm 
                {...book}
                handleSubmit={handleEditSubmit}
                loading={loading}
                setLoading={setLoading}
                setError={setError}
                user={user}
            />
            <button type="button" onClick={() => setDisplay("book")}>Cancel</button>
            <div>{error}</div>
        </div>
    )
}