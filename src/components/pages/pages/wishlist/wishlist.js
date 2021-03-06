import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import book1 from "../../../../../static/assets/Book 1.png"
import book2 from "../../../../../static/assets/Book 3.png"
import book3 from "../../../../../static/assets/Book 5.png"
import book4 from "../../../../../static/assets/Book 6.png"
import book5 from "../../../../../static/assets/Book 7.png"
import book6 from "../../../../../static/assets/Book 10.png"

export default function Shelf({ books, handleViewBook, handleViewWishlistCancel }) {
    const bookImages = [book1, book2, book3, book4, book5, book6]

    // TODO: Add priority
    const renderBooks = () => books.sort((book1, book2) => {
        if (book1.author === book2.author) {
            if (book1.title === book2.title) {
                return book1.id < book2.id ? -1 : 1
            }
            else {
                return book1.title < book2.title ? -1 : 1
            }
        }
        else {
            book1.author < book2.author ? -1 : 1
        }
    }).map((book, index) => (
        <div key={book.id} className="book-display" onClick={() => handleViewBook(book)}>
            <p>{book.title}<br/>by<br/>{book.author}</p>
            <img src={book.thumbnail_url ? book.thumbnail_url : bookImages[index % 6]} alt=""/>
        </div>
    ))

    return (
        <div className='shelf-display wishlist'>
            <h2>Wishlist</h2>
            <button onClick={() => handleViewWishlistCancel()}>Done</button>
            {books.length > 0
            ?
            renderBooks()
            :
            <p>Nothing here yet... Add more books!</p>}
        </div>
    )
}