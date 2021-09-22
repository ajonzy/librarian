import React, { useState } from 'react'

import ManageSeries from "../pages/manage-series/manage-series"
import EditSeries from "../pages/manage-series/edit-series"

export default function manageSeries(props) {
    const [display, setDisplay] = useState(props.series ? "edit-series" : "manage-series")
    const [selectedSeries, setSelectedSeries] = useState(props.series ? props.series : {})
    
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
                    handleViewBook={props.handleViewBook}
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
        <div className='manager-wrapper series-manager-wrapper'>
            <h2>Manage Series</h2>
            <button onClick={() => props.setDisplay("bookcase")}>Done</button>
            {renderDisplay()}
        </div>
    )
}