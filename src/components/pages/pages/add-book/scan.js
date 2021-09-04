import React, { useState, useEffect } from "react"
import BarcodeScannerComponent from "react-webcam-barcode-scanner"

export default function scan({ handleSearch, loading, setError }) {
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
                    if (!loading) {
                        if (result) {
                            handleSearch(result)
                        }
                        else if (err) {
                            if (err.name != "NotFoundException" && err.name != "t") {
                                setError("Error scaning book... Does this app have camera permissions?")
                                console.log(err)
                            }
                        }
                    }
                }}
            />
        </div>
    )
}