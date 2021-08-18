import React from 'react'

export default function shelf(props) {
    return (
        <div className='shelf-wrapper'>
            <h3>{props.shelf.name}</h3>
            <h4>({props.shelf.books.length})</h4>
        </div>
    )
}