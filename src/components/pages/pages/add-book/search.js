import React, { useState } from "react"

export default function search({ handleSearch, loading, setError }) {
    const [titleInput, setTitleInput] = useState("")
    const [authorInput, setAuthorInput] = useState("")

    const handleTitleAuthorSearch = () => {
        let query = ""
        if (titleInput === "" && authorInput === "") {
            setError("Please enter a tile, author, or both to search for")
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
        <div className="search">
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
            <button onClick={handleTitleAuthorSearch} disabled={loading}>Search</button>
        </div>
    )
}