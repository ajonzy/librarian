import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import book1 from "../../../../../static/assets/Book 1.png"
import book2 from "../../../../../static/assets/Book 3.png"
import book3 from "../../../../../static/assets/Book 5.png"
import book4 from "../../../../../static/assets/Book 6.png"
import book5 from "../../../../../static/assets/Book 7.png"
import book6 from "../../../../../static/assets/Book 10.png"
import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function searchResults({ user, searchInput, setDisplay, handleViewBook, handleEditSeries, handleEditShelf, updateUser }) {
    const [selectedSeries, setSelectedSeries] = useState({})
    const [selectedShelf, setSelectedShelf] = useState({})
    const [confirmDelete, setConfirmDelete] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const bookImages = [book1, book2, book3, book4, book5, book6]

    const matchedTitles = user.books.filter(book => (
        book.title.toLowerCase().includes(searchInput)
    ))

    const matchedAuthors = user.books.filter(book => (
        book.author.toLowerCase().includes(searchInput)
    ))

    const matchedNotes = user.books.filter(book => (
        book.notes.toLowerCase().includes(searchInput)
    ))

    const matchedSeries = user.series.filter(series => (
        series.name.toLowerCase().includes(searchInput)
    ))

    const matchedShelves = user.shelves.filter(shelf => (
        shelf.name.toLowerCase().includes(searchInput) && shelf.name !== "All Books"
    ))

    const renderTitles = () => {
        return (
            <div className="search-results-section">
                <h3>Titles</h3>
                {matchedTitles.map((book, index) => (
                    <div key={`${book.id}-title`} className="search-result book-result" onClick={() => handleViewBook(book, user)}>
                        <p>{book.title}<br/>by<br/>{book.author !== "" ? book.author : "Unknown"}</p>
                        <img src={book.thumbnail_url ? book.thumbnail_url : bookImages[index % 6]} alt=""/>
                    </div>
                ))}
            </div>
        )
    }

    const renderAuthors = () => {
        return (
            <div className="search-results-section">
                <div className="spacer-20" />
                <h3>Authors</h3>
                {matchedAuthors.map((book, index) => (
                    <div key={`${book.id}-author`} className="search-result book-result" onClick={() => handleViewBook(book, user)}>
                        <p>{book.title}<br/>by<br/>{book.author !== "" ? book.author : "Unknown"}</p>
                        <img src={book.thumbnail_url ? book.thumbnail_url : bookImages[index % 6]} alt=""/>
                    </div>
                ))}
            </div>
        )
    }

    const renderNotes = () => {
        return (
            <div className="search-results-section">
                <div className="spacer-20" />
                <h3>Notes</h3>
                {matchedNotes.map((book, index) => (
                    <div key={`${book.id}-notes`} className="search-result book-result" onClick={() => handleViewBook(book, user)}>
                        <p>{book.title}<br/>by<br/>{book.author !== "" ? book.author : "Unknown"}</p>
                        <p>({book.notes})</p>
                        <img src={book.thumbnail_url ? book.thumbnail_url : bookImages[index % 6]} alt=""/>
                    </div>
                ))}
            </div>
        )
    }

    const handleDeleteSeries = deletedSeries => {
        if (confirmDelete === "" || selectedSeries.id !== deletedSeries.id) {
            setSelectedSeries(deletedSeries)
            setSelectedShelf({})
            setConfirmDelete("Are you sure you want to delete this series?")
        }
        else {
            setConfirmDelete("")
            setError("")
            setLoading(true)

            fetch(`https://librarianapi.herokuapp.com/series/delete/${deletedSeries.id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                updateUser(data.user)
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error deleting series: ", error)
            })
        }
    }

    const renderBooks = series => {
        let books = []
        books = books.concat(series.books.filter(book => book.series_position !== null).sort((book1, book2) => book1.series_position - book2.series_position))
        books = books.concat(series.books.filter(book => book.series_position === null).sort((book1, book2) => book1.title < book2.title ? -1 : 1))

        return (
            <div className="series-books-display">
                {books.map(book => (
                    <div key={book.id} className="series-book-display" onClick={() => handleViewBook(book, user)}>
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>
        )
    }

    const renderSeries = () => {
        return (
            <div className="search-results-section">
                <div className="spacer-20" />
                <h3>Series</h3>
                <div className="spacer-40" />
                {matchedSeries.map(series => (
                    <div key={`${series.id}-series`} className="search-result series-result">
                        <h3>{series.name}</h3>
                        {renderBooks(series)}
                        <div className="options-wrapper">
                            <button onClick={() => handleEditSeries(series)}>Edit</button>
                            <button onClick={() => handleDeleteSeries(series)} style={{ color: "red" }}>Delete</button>
                        </div>
                        <p className="confirm-error-loading">{series.id === selectedSeries.id ? confirmDelete : ""}{series.id === selectedSeries.id ? error : ""}{series.id === selectedSeries.id && loading ? <img src={loadingImg} /> : null}</p>
                    </div>
                ))}
            </div>
        )
    }

    const handleDeleteShelf = deletedShelf => {
        if (confirmDelete === "" || selectedShelf.id !== deletedShelf.id) {
            setSelectedShelf(deletedShelf)
            setSelectedSeries({})
            setConfirmDelete("Are you sure you want to delete this shelf?")
        }
        else {
            setConfirmDelete("")
            setError("")
            setLoading(true)

            fetch(`https://librarianapi.herokuapp.com/shelf/delete/${deletedShelf.id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                updateUser(data.user)
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error deleting shelf: ", error)
            })
        }
    }

    const renderShelves = () => {
        return (
            <div className="search-results-section">
                <h3>Shelves</h3>
                <div className="spacer-40" />
                {matchedShelves.map(shelf => (
                    <div key={`${shelf.id}-shelf`} className="search-result shelf-result">
                        <h3>{shelf.name}</h3>
                        <div className="options-wrapper">
                            <button disabled={shelf.id === selectedShelf.id ? loading : false} onClick={() => handleEditShelf(shelf)}>Edit</button>
                            <button disabled={shelf.id === selectedShelf.id ? loading : false} onClick={() => handleDeleteShelf(shelf)} style={{ color: "red" }}>Delete</button>
                        </div>
                        <p className="confirm-error-loading">{shelf.id === selectedShelf.id ? confirmDelete : ""}{shelf.id === selectedShelf.id ? error : ""}{shelf.id === selectedShelf.id && loading ? <img src={loadingImg} /> : null}</p>
                    </div>
                ))}
            </div>
        )
    }

    const renderNoResults = () => {
        if (matchedTitles.length === 0 &&
            matchedAuthors.length === 0 &&
            matchedSeries.length === 0 &&
            matchedShelves.length === 0 &&
            matchedNotes.length === 0) {
                return <p>No results found</p>
            }
        else {
            return null
        }
    }

    return (
        <div className="search-results">
            <button onClick={() => setDisplay("search")}><FontAwesomeIcon icon={faLongArrowAltLeft} /> Back</button>
            {matchedTitles.length > 0 ? renderTitles() : null}
            {matchedAuthors.length > 0 ? renderAuthors() : null}
            {matchedNotes.length > 0 ? renderNotes() : null}
            {matchedSeries.length > 0 ? renderSeries() : null}
            {matchedShelves.length > 0 ? renderShelves() : null}
            {renderNoResults()}
        </div>
    )
}