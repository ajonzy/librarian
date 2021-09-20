import React, { useState } from "react"

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function isbn({ isbn, handleSearch, loading, error, setError }) {
    const [isbnInput, setIsbnInput] = useState(isbn)

    const handleIsbnSearch = event => {
        event.preventDefault()

        const isbnCheck = isbnInput.replace("-", "")
        if ((isbnCheck.length !== 10 && isbnCheck.length !== 13) || isNaN(isbnCheck)) {
            setError("ISBN must be 10 or 13 digits")
        }
        else {
            const query = `isbn:${isbnCheck}`
            handleSearch(query)
        }
    }

    return (
        <form onSubmit={handleIsbnSearch} className="isbn">
            <input 
                type="text"
                placeholder="ISBN"
                value={isbnInput}
                onChange={event => setIsbnInput(event.target.value)}
            />
            <button type="submit" disabled={loading}>Search</button>
            <div className="error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
        </form>
    )
}