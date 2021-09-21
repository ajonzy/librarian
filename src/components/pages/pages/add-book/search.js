import React, { useState } from "react"

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function search({ handleSearch, loading, error, setError }) {
    const [titleInput, setTitleInput] = useState("")
    const [authorInput, setAuthorInput] = useState("")

    const handleTitleAuthorSearch = event => {
        event.preventDefault()

        const formattedTitle = titleInput.trim()
        const formattedAuthor = authorInput.trim()

        let query = ""
        if (formattedTitle === "" && formattedAuthor === "") {
            setError("Please enter a title, author, or both")
        }
        else {
            if (formattedTitle !== "") {
                query += `intitle:${formattedTitle}`
            }

            if (formattedTitle !== "" && formattedAuthor !== "") {
                query += "+"
            }

            if (formattedAuthor !== "") {
                query += `inauthor:${formattedAuthor}`
            }

            handleSearch(query)
        }
    }

    return (
        <form onSubmit={handleTitleAuthorSearch} className="search">
            <input 
                type="text"
                autoCorrect="off"
                placeholder="Title"
                value={titleInput}
                onChange={event => setTitleInput(event.target.value)}
            />
            <input 
                type="text"
                autoCorrect="off"
                placeholder="Author"
                value={authorInput}
                onChange={event => setAuthorInput(event.target.value)}
            />
            <button type="submit" disabled={loading}>Search</button>
            <div className="error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
        </form>
    )
}