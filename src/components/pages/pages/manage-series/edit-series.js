import React, { useState } from 'react'

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function editSeries({ selectedSeries, setSelectedSeries, setDisplay, updateUser }) {
    const [nameInput, setNameInput] = useState(selectedSeries.name)
    const [bookPositions, setBookPositions] = useState(selectedSeries.id ? selectedSeries.books.map(book => {return {id: book.id, position: book.series_position || Number.NaN}}) : [])
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
                                  .trim()
                                  .split(" ")
                                  .map(word => word !== "" ?  word[0].toUpperCase() + word.slice(1) : "")
                                  .join(" ")

            const formattedBookPositions = bookPositions.filter(bookPosition => {
                const book = selectedSeries.books.filter(book => book.id === bookPosition.id)[0]
                return book.series_position != bookPosition.position
            })

            fetch(`https://librarianapi.herokuapp.com/series/update/${selectedSeries.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ 
                    name: formattedName,
                    book_positions: formattedBookPositions 
                })
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

    const handlePositionChange = (event, book) => {
        const updatedBook = bookPositions.filter(bookPosition => bookPosition.id === book.id)[0]
        const otherBooks = bookPositions.filter(bookPosition => bookPosition.id !== book.id)

        updatedBook.position = event.target.valueAsNumber

        setBookPositions([updatedBook, ...otherBooks])
    }

    const renderBooks = () => {
        let books = []
        books = books.concat(selectedSeries.books.filter(book => book.series_position !== null).sort((book1, book2) => book1.series_position - book2.series_position))
        books = books.concat(selectedSeries.books.filter(book => book.series_position === null).sort((book1, book2) => book1.title < book2.title ? -1 : 1))

        return (
            <div className="series-books-display">
                {books.map(book => (
                    <div key={book.id} className="series-book-display">
                        <input 
                            type="number" 
                            placeholder="N/A"
                            value={isNaN(bookPositions.filter(bookPosition => bookPosition.id === book.id)[0].position) ? "" : bookPositions.filter(bookPosition => bookPosition.id === book.id)[0].position}
                            onChange={event => handlePositionChange(event, book)}
                        />
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="manage-series-wrapper">
            <form onSubmit={handleEditSeries}>
                <input 
                    type="text" 
                    autoCorrect="off"
                    placeholder="Series Name" 
                    value={nameInput} onChange={event => setNameInput(event.target.value)}
                />
                {selectedSeries.id ? renderBooks() : null}
                <div className="buttons-wrapper">
                    <button type="submit" disabled={loading}>Edit&nbsp;Series</button>
                    <button onClick={handleFormCancel}>Cancel</button>
                </div>
                <div className="error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
            </form>
        </div>
    )
}