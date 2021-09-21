import React, { useState } from 'react'

import Autosuggest from "../../../utitlities/autosuggest"

export default function search({ user, searchInput, setSearchInput, setDisplay }) {
    const [error, setError] = useState("")

    const titles = user.books.map(book => book.title)
    const authors = user.books.map(book => book.author)
    const series = user.series.map(series => series.name)
    const shelves = user.shelves.map(shelf => shelf.name)

    const getSuggestions = () => {
        const suggestions = []

        titles.forEach(title => {
            if (!suggestions.includes(title)) {
                suggestions.push(title)
            }
        })

        authors.forEach(author => {
            if (!suggestions.includes(author)) {
                suggestions.push(author)
            }
        })

        series.forEach(series => {
            if (!suggestions.includes(series)) {
                suggestions.push(series)
            }
        })

        shelves.forEach(shelf => {
            if (!suggestions.includes(shelf) && shelf !== "All Books") {
                suggestions.push(shelf)
            }
        })

        return suggestions.sort((item1, item2) => item1 < item2 ? -1 : 1)
    }

    const handleSearch = (event) => {
        event.preventDefault()

        if (searchInput === "") {
            setError("Please enter an item to search for")
        }
        else {
            setDisplay("search-results")
        }
    }

    return (
        <form onSubmit={handleSearch}>
            <Autosuggest
                input={searchInput}
                setInput={setSearchInput}
                suggestions={getSuggestions()}
                placeholder="Search"
            />
            <button type="submit">Search</button>
            <div className="error-loading">{error}</div>
        </form>
    )
}