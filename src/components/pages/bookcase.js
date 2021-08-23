import React, { useState } from 'react'

import Navbar from "../utitlities/navbar"
import Shelf from "../utitlities/shelf"
import ManageShelves from "./manage-shelves"
import ManageSeries from "./manage-series"

export default function bookcase(props) {
    const [display, setDisplay] = useState("bookcase")
    const [nameInput, setNameInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const renderShelves = () => props.user.shelves.map(shelf => <Shelf key={shelf.id} shelf={shelf}/>)

    const handleAddShelf = event => {
        event.preventDefault()
        setError("")

        if (nameInput === "") {
            setError("Please enter a name")
        }
        else {
            setLoading(true)

            const formattedName = nameInput
                                  .split(" ")
                                  .map(word => word[0].toUpperCase() + word.slice(1))
                                  .join(" ")

            fetch("http://127.0.0.1:5000/shelf/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name: formattedName,
                    user_id: props.user.id
                })
            })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if (typeof data === "string") {
                    console.log(data)
                    if (data === "Error: Shelf already exists") {
                        setError("Shelf already exists")
                    }
                }
                else {
                    setNameInput("")
                    setDisplay("bookcase")
                    props.user.shelves.push(data)
                    props.updateUser(props.user)
                }
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error adding shelf: ", error)
            })
        }
    }

    const handleFormCancel = () => {
        setError("")
        setNameInput("")
        setLoading(false)
        setDisplay("bookcase")
    }

    const renderDisplay = () => {
        switch(display) {
            case "bookcase": return (
                <div className="shelves-wrapper">
                    <div className="add-shelf-wrapper">
                        <h3 onClick={() => setDisplay("add-shelf")}>Add Shelf</h3>
                    </div>
                    {renderShelves()}
                </div>
            )
            case "add-shelf": return (
                <form onSubmit={handleAddShelf}>
                    <input type="text" placeholder="Shelf Name" onChange={event => setNameInput(event.target.value)}/>
                    <div className="buttons-wrapper">
                        <button type="submit" disabled={loading}>Add Shelf</button>
                        <button onClick={handleFormCancel}>Cancel</button>
                    </div>
                    <div>{error}</div>
                </form>
            )
            case "manage-shelves": return (
                <ManageShelves user={props.user} updateUser={props.updateUser} setDisplay={setDisplay} />
            )
            case "manage-series": return (
                <ManageSeries user={props.user} updateUser={props.updateUser} setDisplay={setDisplay} />
            )
        }
    }

    return (
        <div className='bookcase-wrapper'>
            <Navbar 
                user={props.user} 
                handleSuccessfulLogout={props.handleSuccessfulLogout} 
                setDisplay={setDisplay} 
            />
            {renderDisplay()}
        </div>
    )
}