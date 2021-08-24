import React from 'react'

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

    const handleViewShelf = shelf => {
        props.handleViewBookCancel()
        props.handleViewShelf(shelf)
    }

    const renderShelves = () => shelves.map(shelf => shelf.name !== "All Books" ? <p key={shelf.id} onClick={() => handleViewShelf(shelf)}>{shelf.name}</p> : null)

    return (
        <div className='book-display-wrapper'>
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
            {series_data ? <p>Series: {series_data.name}</p> : null}
            {shelves.length > 1 ? <h3>Shelves</h3> : null}
            {renderShelves()}
        </div>
    )
}