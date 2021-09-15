import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faBarcode, faSearch, faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

import Scan from "../pages/add-book/scan"
import Isbn from "../pages/add-book/isbn"
import Search from "../pages/add-book/search"
import SearchResults from "../pages/add-book/search-results"
import AddBook from "../pages/add-book/add-book"

export default function addBook(props) {
    const [display, setDisplay] = useState("scan")
    const [scannedIsbn, setScannedIsbn] = useState("")
    const [booksData, setBooksData] = useState([])
    const [selectedBook, setSelectedBook] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSetDisplay = newDisplay => {
        setLoading(false)
        setError("")
        setSelectedBook({})
        setBooksData([])
        setScannedIsbn("")
        setDisplay(newDisplay)
    }

    const handleScan = isbn => {
        setScannedIsbn(isbn)
        setDisplay("isbn")
        const query = `isbn:${isbn}`
        handleSearch(query)
    }

    const handleSearch = (query) => {
        setLoading(true)
        setError("")

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
        .then(response => response.json())
        .then(data => {
            setLoading(false)
            if (data.items) {
                setBooksData(data.items)
                setDisplay("search-results")
            }
            else {
                setError("No matching books found.")
            }
        })
        .catch(error => {
            setError("An error occured... Please try again later.")
            setLoading(false)
            console.log("Error searching for book: ", error)
        })
    }

    const handleBookSelect = book => {
        setSelectedBook(book)
        setDisplay("add-book")
    }

    const renderDisplay = () => {
        switch(display) {
            case "scan": return (
                <Scan 
                    handleSearch={handleScan}
                    loading={loading}
                    setError={setError}
                />
            )
            case "isbn": return (
                <Isbn 
                    isbn={scannedIsbn}
                    handleSearch={handleSearch}
                    loading={loading}
                    setError={setError}
                />
            )
            case "search": return (
                <Search 
                    handleSearch={handleSearch}
                    loading={loading}
                    setError={setError}
                />
            )
            case "search-results": return (
                <SearchResults 
                    booksData={booksData} 
                    handleBookSelect={handleBookSelect}
                />
            )
            case "add-book": return (
                <AddBook 
                    title={selectedBook.title}
                    author={selectedBook.author}
                    published_year={selectedBook.publishedYear}
                    number_of_pages={selectedBook.pageCount}
                    thumbnail_url={selectedBook.thumbnailUrl}
                    setDisplay={props.setDisplay}
                    user={props.user}
                    updateUser={props.updateUser}
                    handleViewBook={props.handleViewBook}
                />
            )
        }
    }

    return (
        <div className="add-book-wrapper">
            <div className="add-book-options-wrapper">
                <button onClick={() => handleSetDisplay("scan")} className={display === "scan" ? "active" : ""}>
                    <span>Scan</span>
                    <FontAwesomeIcon icon={faExpand} />
                </button>
                <button onClick={() => handleSetDisplay("isbn")} className={display === "isbn" ? "active" : ""}>
                    <span>ISBN</span>
                    <FontAwesomeIcon icon={faBarcode} />
                </button>
                <button onClick={() => handleSetDisplay("search")} className={display === "search" || display === "search-results" ? "active" : ""}>
                    <span>Search</span>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <button onClick={() => handleSetDisplay("add-book")} className={display === "add-book" ? "active" : ""}>
                    <span>Entry</span>
                    <FontAwesomeIcon icon={faFeatherAlt} />
                </button>
            </div>
            {renderDisplay()}
            <div>{error}</div>
        </div>
    )
}