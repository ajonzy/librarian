import React, { useState } from 'react'

export default function book(props) {
    const {
        title,
        author,
        published_year,
        number_of_pages,
        thumbnail_url,
        read,
        rating,
        notes,
        series_data,
        shelves
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
    const [seriesInput, setSeriesInput] = useState(series_data ? series_data.id : null)
    const [shelvesInput, setShelvesInput] = useState(shelves.map(shelf => shelf.id))
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
                        <div onClick={null}>Delete</div>
                    </div>
                </div>
            )
            case "edit-book": return (
                <form>
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
                        value={readInput}
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