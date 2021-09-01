import React, { useState } from 'react'

import BookForm from "../../../utitlities/book-form"

export default function addBook({ title, author, published_year, number_of_pages, thumbnail_url, setDisplay, user, updateUser }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleAddSubmit = addData => {
        if (error === "") {
            fetch("https://librarianapi.herokuapp.com/book/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    title: addData.titleInput,
                    author: addData.authorInput,
                    published_year: addData.publishedYearInput,
                    number_of_pages: addData.numberOfPagesInput,
                    thumbnail_url: addData.thumbnailUrlInput,
                    read: addData.readInput,
                    rating: addData.ratingInput,
                    notes: addData.notesInput,
                    owned: true,
                    series_id: addData.series ? addData.series.id : null,
                    shelves_ids: addData.shelvesIds,
                    user_id: user.id
                })
            })
            .then(response => response.json())
            .then(data => {
                updateUser(data.user)
                setLoading(false)
                setDisplay("bookcase")
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error adding book: ", error)
            })
        }
    }

    return (
        <div className="add-book">
            <BookForm 
                title={title}
                author={author}
                published_year={published_year}
                number_of_pages={number_of_pages}
                thumbnail_url={thumbnail_url}
                handleSubmit={handleAddSubmit}
                loading={loading}
                setLoading={setLoading}
                setError={setError}
                user={user}
            />
            <button type="button" onClick={() => setDisplay("bookcase")}>Cancel</button>
            <div>{error}</div>
        </div>
    )
}