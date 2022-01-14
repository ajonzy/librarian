import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import book1 from "../../../../../static/assets/Book 1.png"
import book2 from "../../../../../static/assets/Book 3.png"
import book3 from "../../../../../static/assets/Book 5.png"
import book4 from "../../../../../static/assets/Book 6.png"
import book5 from "../../../../../static/assets/Book 7.png"
import book6 from "../../../../../static/assets/Book 10.png"

export default function Shelf({ shelf, handleViewBook, handleViewShelfCancel }) {
    const bookImages = [book1, book2, book3, book4, book5, book6]

    const renderBooks = () => shelf.books.filter(book => book.owned).map((book, index) => (
        // TODO: Sort

        <div key={book.id} className="book-display" onClick={() => handleViewBook(book)}>
            <p>{book.title}<br/>by<br/>{book.author}</p>
            <img src={book.thumbnail_url ? book.thumbnail_url : bookImages[index % 6]} alt=""/>
        </div>
    ))

    return (
        <div className='shelf-display'>
            <button onClick={() => handleViewShelfCancel()}><FontAwesomeIcon icon={faLongArrowAltLeft} /> Back</button>
            <h2>{shelf.name}</h2>
            {shelf.books.length > 0
            ?
            renderBooks()
            :
            <p>Nothing here yet... Add more books!</p>}
        </div>
    )
}