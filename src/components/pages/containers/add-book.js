import React, { useState } from "react"

import Scan from "../pages/add-book/scan"
import SearchResults from "../pages/add-book/search-results"

export default function addBook() {
    const [display, setDisplay] = useState("scan")
    const [booksData, setBooksData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSetDisplay = newDisplay => {
        setLoading(false)
        setError("")
        setDisplay(newDisplay)
    }

    const handleSearch = (method, query) => {
        setLoading(true)
        setError("")

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${method}:${query}`)
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
        console.log(book)
    }

    const renderDisplay = () => {
        switch(display) {
            case "scan": return (
                <Scan 
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
        }
    }

    return (
        <div className="add-book-wrapper">
            <div className="add-book-options-wrapper">
                <button onClick={() => handleSetDisplay("scan")}>Scan</button>
                <button onClick={() => handleSetDisplay("isbn")}>ISBN</button>
                <button onClick={() => handleSetDisplay("search")}>Search</button>
                <button onClick={() => handleSetDisplay("manual-input")}>Manual&nbsp;Input</button>
            </div>
            {renderDisplay()}
            <div>{error}</div>
        </div>
    )
}