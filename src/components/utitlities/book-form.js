import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'

import Autosuggest from "./autosuggest"

import loadingImg from "../../../static/assets/loading-small.gif"

export default function bookForm({ title, author, published_year, number_of_pages, thumbnail_url, read, rating, notes, series_id, series_position, series_data, shelves, user_id, handleSubmit, loading, setLoading, error, setError, handleCancel, user }) {
    const [titleInput, setTitleInput] = useState(title || "")
    const [authorInput, setAuthorInput] = useState(author || "")
    const [publishedYearInput, setPublishedYearInput] = useState(published_year || "")
    const [numberOfPagesInput, setNumberOfPagesInput] = useState(number_of_pages || Number.NaN)
    const [thumbnailUrlInput, setThumbnailUrlInput] = useState(thumbnail_url || "")
    const [thumbnailInput, setThumbnailInput] = useState(null)
    const [readInput, setReadInput] = useState(read || false)
    const [ratingInput, setRatingInput] = useState(rating || Number.NaN)
    const [notesInput, setNotesInput] = useState(notes || "")
    const [seriesExists, setSeriesExists] = useState(Boolean(series_id) || false)
    const [seriesInput, setSeriesInput] = useState(series_data ? series_data.name : "")
    const [seriesPositionInput, setSeriesPositionInput] = useState(series_position || Number.NaN)
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
                                      .trim()
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
            let newShelvesCount = 0
            for (let shelfInput of shelvesInput) {
                if (shelfInput !== "") {
                    let shelf = user.shelves.filter(shelf => shelf.name.toLowerCase() === shelfInput.toLowerCase())[0]
                    if (shelf === undefined) {
                        const formattedName = shelfInput
                                              .trim()
                                              .split(" ")
                                              .map(word => word[0].toUpperCase() + word.slice(1))
                                              .join(" ")
    
                        await fetch("https://librarianapi.herokuapp.com/shelf/add", {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                                name: formattedName,
                                position: user.shelves.length + newShelvesCount,
                                user_id: user_id
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            shelf = data.item
                            newShelvesCount++
                        })
                        .catch(error => {
                            setError("An error occured... Please try again later.")
                            setLoading(false)
                            console.log("Error adding shelf: ", error)
                        })
                    }
                    shelvesIds.push(shelf.id)
                }
            }

            let thumbnail = thumbnailUrlInput
            if (thumbnailInput) {
                const form = new FormData()
                form.append("file", thumbnailInput)
                form.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)

                await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
                    method: "POST",
                    body: form
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error.message)
                        setError("An error occured... Please try again later.")
                        setLoading(false)
                    }
                    else {
                        thumbnail = data.url
                        setThumbnailUrlInput(data.url)
                    }
                })
                .catch(error => {
                    setError("An error occured... Please try again later.")
                    setLoading(false)
                    console.log("Error adding shelf: ", error)
                })
            }

            handleSubmit({ 
                titleInput: titleInput.trim(), 
                authorInput: authorInput.trim(), 
                publishedYearInput: publishedYearInput.trim(), 
                numberOfPagesInput, thumbnail, readInput, ratingInput, notesInput, series, seriesPositionInput, shelvesIds, user_id 
            })
        }
    }

    const handleImageUpload = event => {
        if (event.target.files && event.target.files[0]) {
            const file = new FileReader()
            let img = event.target.files[0]
            file.onload = () => setThumbnailInput(file.result)
            file.readAsDataURL(img)
        }
    }

    const handleImageRemove = event => {
        event.preventDefault()

        setThumbnailInput(null)
    }

    const textAreaAdjust = event => {
        event.target.style.height = "inherit";
        event.target.style.height = `${event.target.scrollHeight + 2.4}px`;
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Title
                <input type="text" 
                    placeholder="Title"
                    value={titleInput}
                    onChange={event => setTitleInput(event.target.value)}
                />
            </label>
            <label>
                Author
                <input type="text" 
                    placeholder="Author"
                    value={authorInput}
                    onChange={event => setAuthorInput(event.target.value)}
                />
            </label>
            <label>
                Published Year
                <input type="text" 
                    placeholder="Published Year"
                    value={publishedYearInput}
                    onChange={event => setPublishedYearInput(event.target.value)}
                />
            </label>
            <label>
                Number of Pages
                <input type="number" 
                    placeholder="Number of Pages"
                    value={isNaN(numberOfPagesInput) ? "" : numberOfPagesInput}
                    min="1"
                    onChange={event => setNumberOfPagesInput(event.target.valueAsNumber)}
                />
            </label>
            <div className="thumnail-wrapper">
                <label>
                    Thumbnail Image
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }} 
                    />
                    <img src={thumbnailInput ? thumbnailInput : thumbnailUrlInput} alt=""/>
                    <div className="options-wrapper">
                        <FontAwesomeIcon icon={faUpload} />
                        {thumbnailInput ? <FontAwesomeIcon icon={faTimesCircle} onClick={handleImageRemove} /> : null}
                    </div>
                </label>
            </div>
            <label>
                Read: 
                <input type="checkbox" 
                    placeholder="Read"
                    checked={readInput}
                    onChange={event => setReadInput(event.target.checked)}
                    style={{ display: "none" }}
                />
                {<FontAwesomeIcon icon={readInput ? faCheckSquare : faSquare} />}
            </label>
            <label>
                Rating
                <input className="numberInput" type="number" 
                    placeholder="Rating"
                    value={isNaN(ratingInput) ? "" : ratingInput}
                    min="1"
                    max="10"
                    onChange={event => setRatingInput(event.target.valueAsNumber)}
                />
            </label>
            <label>
                Notes
                <textarea
                    placeholder="Notes"
                    value={notesInput}
                    onChange={event => setNotesInput(event.target.value)}
                    onKeyUp={textAreaAdjust}
                />
            </label>
            {seriesExists
            ?
            <div className="series-wrapper">
                <label>
                    Series Name
                    <Autosuggest
                        input={seriesInput}
                        setInput={setSeriesInput}
                        suggestions={user.series.map(series => series.name)}
                        placeholder="Series"
                    />
                </label>
                <label>
                    Series Position
                    <input className="numberInput" type="number" 
                        placeholder="Position"
                        value={isNaN(seriesPositionInput) ? "" : seriesPositionInput}
                        min="0"
                        onChange={event => setSeriesPositionInput(event.target.valueAsNumber)}
                    />
                </label>
                <button type="button" onClick={handleRemoveSeries}>Remove Series</button>
            </div>
            :
            <button type="button" onClick={() => setSeriesExists(true)}>Add Series</button>}
            <div className="shelves-display-wrapper">
                {shelvesInput.map((shelf, index) => (
                    shelf !== "All Books" ?
                    <div key={index} className="shelf-display-wrapper">
                        <label>
                            Shelf Name
                            <Autosuggest 
                                input={shelvesInput[index] ? shelvesInput[index] : ""}
                                setInput={newInput => setShelvesInput(shelvesInput.map((oldShelf, oldIndex) => oldIndex === index ? newInput : oldShelf))}
                                suggestions={user.shelves.filter(shelf => shelf.name !== "All Books").map(shelf => shelf.name)}
                                placeholder="Shelf"
                            />
                        </label>
                        <button type="button" onClick={() => setShelvesInput(shelvesInput.filter((_, oldIndex) => oldIndex !== index))}>Remove Shelf</button>
                    </div>
                    : null
                ))}
                <button type="button" onClick={() => setShelvesInput([...shelvesInput, ""])}>Add Shelf</button>
            </div>

            <div className="options-wrapper">
                <button type="submit" disabled={loading}>Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
            <div className="error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
        </form>
    )
}