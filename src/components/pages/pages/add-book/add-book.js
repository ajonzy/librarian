import React, { useState, useEffect } from 'react'

import BookForm from "../../../utitlities/book-form"

export default function addBook({ title, author, published_year, number_of_pages, thumbnail_url, setDisplay, user, updateUser, handleViewBook }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [submitForm, setSubmitForm] = useState(false)
    const [submitFormData, setSubmitFormData] = useState({})

    useEffect(() => {
        if (submitForm) {
            const addData = submitFormData
            setSubmitForm(false)
            setSubmitFormData({})
            if (error === "") {
                fetch("https://librarianapi.herokuapp.com/book/add", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        title: addData.titleInput,
                        author: addData.authorInput,
                        published_year: addData.publishedYearInput,
                        number_of_pages: addData.numberOfPagesInput,
                        thumbnail_url: addData.thumbnail,
                        read: addData.readInput,
                        rating: addData.ratingInput,
                        notes: addData.notesInput,
                        owned: addData.ownedInput,
                        series_id: addData.series ? addData.series.id : null,
                        series_position: addData.series ? addData.seriesPositionInput : null,
                        shelves_ids: addData.shelvesIds,
                        user_id: user.id
                    })
                })
                .then(response => response.json())
                .then(data => {
                    updateUser(data.user)
                    setLoading(false)
                    handleViewBook(data.item, data.user)
                })
                .catch(error => {
                    setError("An error occured... Please try again later.")
                    setLoading(false)
                    console.log("Error adding book: ", error)
                })
            }
            else {
                setLoading(false)
            }
        }
    }, [submitForm])

    const handleAddSubmit = addData => {
        setSubmitFormData(addData)
        setSubmitForm(true)
    }

    const handleCancel = () => setDisplay("bookcase")

    return (
        <div className="add-book">
            <BookForm 
                title={title}
                author={author}
                published_year={published_year}
                number_of_pages={number_of_pages}
                thumbnail_url={thumbnail_url}
                user_id={user.id}
                handleSubmit={handleAddSubmit}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
                handleCancel={handleCancel}
                user={user}
            />
        </div>
    )
}