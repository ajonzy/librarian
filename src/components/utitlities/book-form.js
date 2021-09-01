import React, { useState } from 'react'

import Autosuggest from "./autosuggest"

export default function bookForm({ title, author, published_year, number_of_pages, thumbnail_url, read, rating, notes, series_id, series_data, shelves, user_id, handleSubmit, loading, setLoading, setError, user }) {
    const [titleInput, setTitleInput] = useState(title || "")
    const [authorInput, setAuthorInput] = useState(author || "")
    const [publishedYearInput, setPublishedYearInput] = useState(published_year || "")
    const [numberOfPagesInput, setNumberOfPagesInput] = useState(number_of_pages || null)
    const [thumbnailUrlInput, setThumbnailUrlInput] = useState(thumbnail_url || "")
    const [readInput, setReadInput] = useState(read || false)
    const [ratingInput, setRatingInput] = useState(rating || null)
    const [notesInput, setNotesInput] = useState(notes || "")
    const [seriesExists, setSeriesExists] = useState(Boolean(series_id) || false)
    const [seriesInput, setSeriesInput] = useState(series_data ? series_data.name : "")
    const [shelvesInput, setShelvesInput] = useState(shelves ? shelves.map(shelf => shelf.name) : ["All Books"])

    const handleRemoveSeries = () => {
        setSeriesExists(false)
        setSeriesInput("")
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        setError("")

        if (titleInput === "" || authorInput === "") {
            setError("Title and Author fields must be filled out")
        }
        else {
            setLoading(true)

            let series = user.series.filter(series => series.name.toLowerCase() === seriesInput.toLowerCase())[0]
            if (series === undefined && seriesInput !== "") {
                const formattedName = seriesInput
                                      .split(" ")
                                      .map(word => word[0].toUpperCase() + word.slice(1))
                                      .join(" ")
    
                await fetch("https://librarianapi.herokuapp.com/series/add", {
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
    
            const shelvesIds = []
            for (let shelfInput of shelvesInput) {
                if (shelfInput !== "") {
                    let shelf = user.shelves.filter(shelf => shelf.name.toLowerCase() === shelfInput.toLowerCase())[0]
                    if (shelf === undefined) {
                        const formattedName = shelfInput
                                              .split(" ")
                                              .map(word => word[0].toUpperCase() + word.slice(1))
                                              .join(" ")
    
                        await fetch("https://librarianapi.herokuapp.com/shelf/add", {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                                name: formattedName,
                                user_id: user_id
                            })
                        })
                        .then(response => response.json())
                        .then(data => shelf = data.item)
                        .catch(error => {
                            setError("An error occured... Please try again later.")
                            setLoading(false)
                            console.log("Error adding shelf: ", error)
                        })
                    }
                    shelvesIds.push(shelf.id)
                }
            }

            const numberOfPages = isNaN(numberOfPagesInput) ? -1 : numberOfPagesInput
            const rating = isNaN(ratingInput) ? 0 : ratingInput

            handleSubmit({ titleInput, authorInput, publishedYearInput, numberOfPages, thumbnailUrlInput, readInput, rating, notesInput, series, shelvesIds, user_id })
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
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
                    placeholder="Series"
                />
                <button type="button" onClick={handleRemoveSeries}>Remove Series</button>
            </div>
            :
            <button type="button" onClick={() => setSeriesExists(true)}>Add Series</button>}
            <div className="shelves-wrapper">
                {shelvesInput.map((shelf, index) => (
                    shelf !== "All Books" ?
                    <div key={index} className="shelf-wrapper">
                        <Autosuggest 
                            input={shelvesInput[index] ? shelvesInput[index] : ""}
                            setInput={newInput => setShelvesInput(shelvesInput.map((oldShelf, oldIndex) => oldIndex === index ? newInput : oldShelf))}
                            suggestions={user.shelves.filter(shelf => shelf.name !== "All Books")}
                            placeholder="Shelf"
                        />
                        <button type="button" onClick={() => setShelvesInput(shelvesInput.filter((_, oldIndex) => oldIndex !== index))}>Remove Shelf</button>
                    </div>
                    : null
                ))}
                <button type="button" onClick={() => setShelvesInput([...shelvesInput, ""])}>Add Shelf</button>
            </div>

            <button type="submit" disabled={loading}>Submit</button>
        </form>
    )
}