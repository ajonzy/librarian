import React from 'react'

export default function searchResults({ booksData, handleBookSelect }) {
    return (
        <div className='search-results-wrapper'>
            {booksData.map((book, index) => {
                const title = book.volumeInfo.title || "Unknown"
                const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown"
                const publishedYear = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.slice(0, 4) : "Unknown"
                const pageCount = book.volumeInfo.pageCount || Number.NaN
                const thumbnailUrl = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""

                return (
                    <div key={`${book.id}-${index}`} className="book-result">
                        <img src={thumbnailUrl} alt=""/>
                        <p>Title: {title}</p>
                        <p>Author: {author}</p>
                        <p>Published Year: {publishedYear}</p>
                        <p>Page Count: {!isNaN(pageCount) ? pageCount : "Unknown"}</p>
                        <button onClick={() => handleBookSelect({ title, author, publishedYear, pageCount, thumbnailUrl })}>Select</button>
                    </div>
                )
            })}
        </div>
    )
}