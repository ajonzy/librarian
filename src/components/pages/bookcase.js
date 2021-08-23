import React, { useState } from 'react'

import Navbar from "../utitlities/navbar"
import Shelf from "../utitlities/shelf"
import ManageShelves from "./manage-shelves"

export default function bookcase(props) {
    const [display, setDisplay] = useState("bookcase")
    const [nameInput, setNameInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [manageShelvesDisplay, setManageShelvesDisplay] = useState("manage-shelves")

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

    const handleEditShelf = (editedShelf, name) => {
        event.preventDefault()
        setError("")

        if (name === "") {
            setError("Please enter a name")
        }
        else {
            setLoading(true)

            const formattedName = name
                                  .split(" ")
                                  .map(word => word[0].toUpperCase() + word.slice(1))
                                  .join(" ")

            fetch(`http://127.0.0.1:5000/shelf/update/${editedShelf.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name: formattedName })
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
                    setManageShelvesDisplay("manage-shelves")
                    props.user.shelves = props.user.shelves.map(shelf => shelf.id === editedShelf.id ? data : shelf)
                    props.updateUser(props.user)
                }
            })
            .catch(error => {
                setError("An error occured... Please try again later.")
                setLoading(false)
                console.log("Error updating shelf: ", error)
            })
        }
    }

    const handleDeleteShelf = deletedShelf => {
        fetch(`http://127.0.0.1:5000/shelf/delete/${deletedShelf.id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            props.user.shelves = props.user.shelves.filter(shelf => shelf.id !== deletedShelf.id)
            props.updateUser(props.user)
        })
        .catch(error => console.log("Error deleting shelf: ", error))
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
                <ManageShelves 
                    shelves={props.user.shelves} 
                    setDisplay={setDisplay}
                    display={manageShelvesDisplay}
                    setManageShelvesDisplay={setManageShelvesDisplay} 
                    handleEditShelf={handleEditShelf} 
                    handleDeleteShelf={handleDeleteShelf}
                    loading={loading}
                    setLoading={setLoading}
                    error={error}
                    setError={setError}
                 />
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