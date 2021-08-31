import React from 'react'

export default function searchResults({ booksData, handleBookSelect }) {
    return (
        <div className='search-results-wrapper'>
            {booksData.map(book => (
                <div key={book.id} className="book-result">
                    <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""} alt=""/>
                    <p>Title: {book.volumeInfo.title || "Unknown"}</p>
                    <p>Author: {book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown"}</p>
                    <p>Published Year: {book.volumeInfo.publishedDate || "Unknown"}</p>
                    <p>Page Count: {book.volumeInfo.pageCount || "Unknown"}</p>
                    <button onClick={() => handleBookSelect(book)}>Select</button>
                </div>
            ))}
        </div>
    )
}