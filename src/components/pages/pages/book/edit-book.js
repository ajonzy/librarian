import React, { useState, useEffect } from 'react'

import BookForm from "../../../utitlities/book-form"

export default function editBook({ book, setDisplay, handleScroll, user, updateUser }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [submitForm, setSubmitForm] = useState(false)
    const [submitFormData, setSubmitFormData] = useState({})

    useEffect(() => {
        if (submitForm) {
            const editData = submitFormData
            setSubmitForm(false)
            setSubmitFormData({})
            if (error === "") {
                fetch(`https://librarianapi.herokuapp.com/book/update/${book.id}`, {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        title: editData.titleInput,
                        author: editData.authorInput,
                        published_year: editData.publishedYearInput,
                        number_of_pages: editData.numberOfPagesInput,
                        thumbnail_url: editData.thumbnail,
                        read: editData.readInput,
                        owned: editData.ownedInput,
                        rating: editData.ratingInput,
                        notes: editData.notesInput,
                        series_id: editData.series ? editData.series.id : null,
                        series_position: editData.series ? editData.seriesPositionInput : null,
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
            else {
                setLoading(false)
            }
        }
    }, [submitForm])

    const handleEditSubmit = editData => {
        setSubmitFormData(editData)
        setSubmitForm(true)
    }

    const handleCancel = () => {
        setDisplay("book")
        handleScroll()
    }

    return (
        <div className="edit-book">
            <BookForm 
                {...book}
                handleSubmit={handleEditSubmit}
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