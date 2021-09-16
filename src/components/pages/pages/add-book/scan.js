import React, { useState, useEffect, useRef } from "react"
import BarcodeScannerComponent from "react-webcam-barcode-scanner"

export default function scan({ handleSearch, loading, setError }) {
    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    const scanRef = useRef(null)

    useEffect(() => {
        setWindowWidth(scanRef.current.offsetWidth)
        setWindowHeight(scanRef.current.offsetHeight)

        window.onresize = () => {
            setWindowWidth(scanRef.current.offsetWidth)
            setWindowHeight(scanRef.current.offsetHeight)
        }

        return () => {
            window.onresize = null
        }
    }, [])

    return (
        <div ref={scanRef} className="scan">
            <BarcodeScannerComponent
                width={windowWidth}
                height={windowHeight}
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