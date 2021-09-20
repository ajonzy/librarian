import React, { useState } from "react"

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function search({ handleSearch, loading, error, setError }) {
    const [titleInput, setTitleInput] = useState("")
    const [authorInput, setAuthorInput] = useState("")

    const handleTitleAuthorSearch = event => {
        event.preventDefault()

        let query = ""
        if (titleInput === "" && authorInput === "") {
            setError("Please enter a title, author, or both")
        }
        else {
            if (titleInput !== "") {
                query += `intitle:${titleInput}`
            }

            if (titleInput !== "" && authorInput !== "") {
                query += "+"
            }

            if (authorInput !== "") {
                query += `inauthor:${authorInput}`
            }

            handleSearch(query)
        }
    }

    return (
        <form onSubmit={handleTitleAuthorSearch} className="search">
            <input 
                type="text"
                placeholder="Title"
                value={titleInput}
                onChange={event => setTitleInput(event.target.value)}
            />
            <input 
                type="text"
                placeholder="Author"
                value={authorInput}
                onChange={event => setAuthorInput(event.target.value)}
            />
            <button type="submit" disabled={loading}>Search</button>
            <div className="error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
        </form>
    )
}