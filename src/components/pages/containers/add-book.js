import React, { useState } from "react"

import Scan from "../pages/add-book/scan"

export default function addBook() {
    const [display, setDisplay] = useState("scan")

    const renderDisplay = () => {
        switch(display) {
            case "scan": return (
                <Scan />
            )
        }
    }

    return (
        <div className="add-book-wrapper">
            {renderDisplay()}
        </div>
    )
}