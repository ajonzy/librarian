import React, { useState } from 'react'

import Autosuggest from "../../../utitlities/autosuggest"

export default function editBook({ id, title, author, published_year, number_of_pages, thumbnail_url, read, rating, notes, series_id, series_data, user_id, setDisplay, user, updateUser }) {
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

    const handleRemoveSeries = () => {
        setSeriesExists(false)
        setSeriesInput("")
    }

    const handleEditSubmit = async event => {
        event.preventDefault()

        setLoading(true)
        setError("")

        let series = user.series.filter(series => series.name.toLowerCase() === seriesInput.toLowerCase())[0]
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
                    user_id: user_id
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
                    suggestions={user.series}
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