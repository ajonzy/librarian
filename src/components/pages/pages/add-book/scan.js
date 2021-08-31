import React, { useState, useEffect } from "react"
import BarcodeScannerComponent from "react-webcam-barcode-scanner"

export default function scan(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.onresize = () => {
            setWindowWidth(window.innerWidth)
        }

        return () => {
            window.onresize = null
        }
    }, [])

    return (
        <div className="scan">
            <BarcodeScannerComponent
                width={windowWidth}
                onUpdate={(err, result) => {
                    if (!props.loading) {
                        if (result) {
                            props.handleSearch("isbn", result)
                        }
                        else if (err) {
                            // TODO: Remove testing line
                            props.handleSearch("isbn", "9781524412357")
                            if (err.name != "NotFoundException") {
                                props.setError("Error scaning book... Does this app have camera permissions?")
                                console.log(err)
                            }
                        }
                    }
                }}
            />
        </div>
    )
}