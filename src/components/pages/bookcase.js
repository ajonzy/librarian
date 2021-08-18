import React from 'react'

import Navbar from "../utitlities/navbar"
import Shelf from "../utitlities/shelf"

export default function bookcase(props) {
    const renderShelves = () => props.user.shelves.map(shelf => <Shelf key={shelf.id} shelf={shelf}/>)

    return (
        <div className='bookcase-wrapper'>
            <Navbar user={props.user} handleSuccessfulLogout={props.handleSuccessfulLogout} />
            {renderShelves()}
        </div>
    )
}