import React, { useState } from "react"

export default function isbn({ handleSearch, loading, setError }) {
    const [isbnInput, setIsbnInput] = useState("")

    const handleIsbnSearch = () => {
        const isbnCheck = isbnInput.replace("-", "")
        if ((isbnCheck.length !== 10 && isbnCheck.length !== 13) || isNaN(isbnCheck)) {
            setError("ISBN must be 10 or 13 digits only")
        }
        else {
            const query = `isbn:${isbnCheck}`
            handleSearch(query)
        }
    }

    return (
        <div className="isbn">
            <input 
                type="text"
                placeholder="ISBN"
                value={isbnInput}
                onChange={event => setIsbnInput(event.target.value)}
            />
            <button onClick={handleIsbnSearch} disabled={loading}>Search</button>
        </div>
    )
}