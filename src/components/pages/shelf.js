import React from 'react'

export default function shelf(props) {
    const renderBooks = () => props.shelf.books.map(book => <div key={book.id}>{book.title}</div>)

    return (
        <div className='shelf-display-wrapper'>
            <h2>{props.shelf.name}</h2>
            <button onClick={() => props.handleViewShelfCancel("bookcase")}>Back</button>
            {renderBooks()}
        </div>
    )
}