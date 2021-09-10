import React from 'react'

export default function book({ user, searchInput, setDisplay }) {
    const matchedTitles = user.books.filter(book => (
        book.title.toLowerCase().includes(searchInput)
    ))

    const matchedAuthors = user.books.filter(book => (
        book.author.toLowerCase().includes(searchInput)
    ))

    const matchedSeries = user.books.filter(book => (
        book.series_data ? book.series_data.name.toLowerCase().includes(searchInput) : false
    ))

    const matchedNotes = user.books.filter(book => (
        book.notes.toLowerCase().includes(searchInput)
    ))

    const renderTitles = () => {
        return (
            <div className="search-results-section">
                <h3>Titles</h3>
                {matchedTitles.map(book => (
                    <div key={`${book.id}-title`} className="search-result">
                        <p>{book.title}<br/>by<br/>{book.author}</p>
                        <img src={book.thumbnail_url} alt=""/>
                    </div>
                ))}
            </div>
        )
    }

    const renderAuthors = () => {
        return (
            <div className="search-results-section">
                <h3>Authors</h3>
                {matchedAuthors.map(book => (
                    <div key={`${book.id}-author`} className="search-result">
                        <p>{book.title}<br/>by<br/>{book.author}</p>
                        <img src={book.thumbnail_url} alt=""/>
                    </div>
                ))}
            </div>
        )
    }

    const renderSeries = () => {
        return (
            <div className="search-results-section">
                <h3>Series</h3>
                {matchedSeries.map(book => (
                    <div key={`${book.id}-series`} className="search-result">
                        <p>{book.title}<br/>by<br/>{book.author}</p>
                        <p>({book.series_data.name})</p>
                        <img src={book.thumbnail_url} alt=""/>
                    </div>
                ))}
            </div>
        )
    }

    const renderNotes = () => {
        return (
            <div className="search-results-section">
                <h3>Notes</h3>
                {matchedNotes.map(book => (
                    <div key={`${book.id}-notes`} className="search-result">
                        <p>{book.title}<br/>by<br/>{book.author}</p>
                        <p>({book.notes})</p>
                        <img src={book.thumbnail_url} alt=""/>
                    </div>
                ))}
            </div>
        )
    }

    const renderNoResults = () => {
        if (matchedTitles.length === 0 &&
            matchedAuthors.length === 0 &&
            matchedSeries.length === 0 &&
            matchedNotes.length === 0) {
                return <p>No results found</p>
            }
        else {
            return null
        }
    }

    return (
        <div className="search-results">
            {matchedTitles.length > 0 ? renderTitles() : null}
            {matchedAuthors.length > 0 ? renderAuthors() : null}
            {matchedSeries.length > 0 ? renderSeries() : null}
            {matchedNotes.length > 0 ? renderNotes() : null}
            {renderNoResults()}
            <button onClick={() => setDisplay("search")}>Back</button>
        </div>
    )
}