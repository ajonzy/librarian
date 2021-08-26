import React, { useState } from 'react'

import Autosuggest from "../utitlities/autosuggest"

export default function book(props) {
    const {
        id,
        title,
        author,
        published_year,
        number_of_pages,
        thumbnail_url,
        read,
        rating,
        notes,
        series_id,
        series_data,
        shelves,
        user_id
    } = props.book

    const [display, setDisplay] = useState("book")
    const [titleInput, setTitleInput] = useState(title)
    const [authorInput, setAuthorInput] = useState(author)
    const [publishedYearInput, setPublishedYearInput] = useState(published_year)
    const [numberOfPagesInput, setNumberOfPagesInput] = useState(number_of_pages)
    const [thumbnailUrlInput, setThumbnailUrlInput] = useState(thumbnail_url)
    const [readInput, setReadInput] = useState(read)
    const [ratingInput, setRatingInput] = useState(rating)
    const [notesInput, setNotesInput] = useState(notes)
    const [seriesExists, setSeriesExists] = useState(Boolean(series_id))
    const [seriesInput, setSeriesInput] = useState(series_data ? series_data.name : "")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleViewShelf = shelf => {
        props.handleViewBookCancel()
        props.handleViewShelf(shelf)
    }

    const renderSeries = () => {
        const series = props.series.filter(series => series.id === series_data.id)[0]

        return (
            <ul>{series.books.map(book => (
                <li key={book.id} onClick={() => props.handleChangeBookView(book)}>{book.title}</li>
            ))}</ul>
        )
    }

    const renderShelves = () => {
        return shelves.map(shelf => shelf.name !== "All Books" ? (
            <p key={shelf.id} onClick={() => handleViewShelf(shelf)}>{shelf.name}</p>
         ) : null)
    }

    const handleRemoveSeries = () => {
        setSeriesExists(false)
        setSeriesInput("")
    }

    const handleEditSubmit = async event => {
        event.preventDefault()

        setLoading(true)
        setError("")

        let series = props.series.filter(series => series.name.toLowerCase() === seriesInput.toLowerCase())[0]
        if (series === undefined && seriesInput !== "") {
            const formattedName = seriesInput
                                  .split(" ")
                                  .map(word => word[0].toUpperCase() + word.slice(1))
                                  .join(" ")

            await fetch("http://127.0.0.1:5000/series/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name: formattedName,
                    user_id
                })
            })
            .then(response => response.json())
            .then(data => series = data.item)
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error adding series: ", error)
            })
        }

        if (error === "") {
            await fetch(`http://127.0.0.1:5000/book/update/${id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    title: titleInput,
                    author: authorInput,
                    published_year: publishedYearInput,
                    number_of_pages: numberOfPagesInput,
                    thumbnail_url: thumbnailUrlInput,
                    read: readInput,
                    rating: ratingInput,
                    notes: notesInput,
                    series_id: series ? series.id : null
                })
            })
            .then(response => response.json())
            .then(data => {
                props.updateUser(data.user)
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

    const renderDisplay = () => {
        switch(display) {
            case "book": return (
                <div className="book-wrapper">
                    <button onClick={() => props.handleViewBookCancel()}>Back</button>
                    <h2>{title}</h2>
                    <h3>{author}</h3>
                    <p>Published: {published_year}</p>
                    <p>Pages: {number_of_pages}</p>
                    <img src={thumbnail_url} alt=""/>
                    <p>Read: <input type="checkbox" checked={read} disabled /></p>
                    {/* TODO: Add grey stars to represent negative ratings */}
                    <p>Rating: {"\u2605".repeat(rating)}</p>
                    <p>Notes: {notes}</p>
                    {series_data ? <h3>Series</h3> : null}
                    {series_data ? <h4>{series_data.name}</h4> : null}
                    {series_data ? renderSeries() : null}
                    {shelves.length > 1 ? <h3>Shelves</h3> : null}
                    {renderShelves()}
                    <div className="options-wrapper">
                        <div onClick={() => setDisplay("edit-book")}>Edit</div>
                        {/* TODO: Add delete function */}
                        <div onClick={null}>Delete</div>
                    </div>
                </div>
            )
            case "edit-book": return (
                <form onSubmit={handleEditSubmit}>
                    <input type="text" 
                        placeholder="Title"
                        value={titleInput}
                        onChange={event => setTitleInput(event.target.value)}
                    />
                    <input type="text" 
                        placeholder="Author"
                        value={authorInput}
                        onChange={event => setAuthorInput(event.target.value)}
                    />
                    <input type="text" 
                        placeholder="Published Year"
                        value={publishedYearInput}
                        onChange={event => setPublishedYearInput(event.target.value)}
                    />
                    <input type="number" 
                        placeholder="Number of Pages"
                        value={numberOfPagesInput}
                        onChange={event => setNumberOfPagesInput(event.target.valueAsNumber)}
                    />
                    <input type="text" 
                        placeholder="Thumbnail URL"
                        value={thumbnailUrlInput}
                        onChange={event => setThumbnailUrlInput(event.target.value)}
                    />
                    <label>Read: </label>
                    <input type="checkbox" 
                        placeholder="Read"
                        checked={readInput}
                        onChange={event => setReadInput(event.target.checked)}
                    />
                    <input type="number" 
                        placeholder="Rating"
                        value={ratingInput}
                        min="1"
                        max="10"
                        onChange={event => setRatingInput(event.target.valueAsNumber)}
                    />
                    <textarea
                        placeholder="Notes"
                        value={notesInput}
                        onChange={event => setNotesInput(event.target.value)}
                    />
                    {seriesExists
                    ?
                    <div className="series-wrapper">
                        <Autosuggest
                            input={seriesInput}
                            setInput={setSeriesInput}
                            suggestions={props.series}
                        />
                        <button type="button" onClick={handleRemoveSeries}>Remove Series</button>
                    </div>
                    :
                    <button type="button" onClick={() => setSeriesExists(true)}>Add Series</button>}
                    <button type="button">Edit Shelves</button>
                    <button type="submit" disabled={loading}>Submit</button>
                    <button type="button" onClick={() => setDisplay("book")}>Cancel</button>
                </form>
            )
        }
    }

    return (
        <div className='book-display-wrapper'>
            {renderDisplay()}
        </div>
    )
}