import React, { useState } from 'react'

import ManageSeries from "../pages/manage-series/manage-series"
import EditSeries from "../pages/manage-series/edit-series"

export default function manageSeries(props) {
    const [display, setDisplay] = useState("manage-series")
    const [selectedSeries, setSelectedSeries] = useState({})
    
    const handleEdit = series => {
        setSelectedSeries(series)
        setDisplay("edit-series")
    }

    const renderDisplay = () => {
        switch(display) {
            case "manage-series": return (
                <ManageSeries 
                    user={props.user} 
                    updateUser={props.updateUser} 
                    handleEdit={handleEdit} 
                />
            )
            case "edit-series": return (
                <EditSeries 
                    selectedSeries={selectedSeries} 
                    setSelectedSeries={setSelectedSeries} 
                    updateUser={props.updateUser} 
                    setDisplay={setDisplay} 
                />
            )
        }
    }

    return (
        <div className='manager-wrapper'>
            <h2>Manage Series</h2>
            <button onClick={() => props.setDisplay("bookcase")}>Done</button>
            {renderDisplay()}
        </div>
    )
}