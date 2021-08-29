import React from 'react'

export default function Shelf({ shelf, handleViewBook, handleViewShelfCancel }) {
    const renderBooks = () => shelf.books.map(book => (
        <div key={book.id} onClick={() => handleViewBook(book)}>{book.title}</div>
    ))

    return (
        <div className='shelf-display'>
            <h2>{shelf.name}</h2>
            <button onClick={() => handleViewShelfCancel()}>Back</button>
            {renderBooks()}
        </div>
    )
}