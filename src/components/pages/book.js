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
            {series_data ? <h3>Series</h3> : null}
            {series_data ? <h4>{series_data.name}</h4> : null}
            {series_data ? renderSeries() : null}
            {shelves.length > 1 ? <h3>Shelves</h3> : null}
            {renderShelves()}
        </div>
    )
}