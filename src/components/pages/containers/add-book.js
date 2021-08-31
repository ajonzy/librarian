import React, { useState } from "react"

import Scan from "../pages/add-book/scan"

export default function addBook() {
    const [display, setDisplay] = useState("scan")
    const [booksData, setBooksData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSetNestedDisplay = newDisplay => {
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

    const renderDisplay = () => {
        switch(display) {
            case "scan": return (
                <Scan 
                    setDisplay={handleSetNestedDisplay}
                    handleSearch={handleSearch}
                    loading={loading}
                    setError={setError}
                />
            )
        }
    }

    return (
        <div className="add-book-wrapper">
            {renderDisplay()}
            <div>{error}</div>
        </div>
    )
}