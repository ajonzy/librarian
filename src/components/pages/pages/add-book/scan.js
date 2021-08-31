import React from "react"
import BarcodeScannerComponent from "react-webcam-barcode-scanner"

export default function scan(props) {
    return (
        <div className="scan">
            <BarcodeScannerComponent
                width={window.innerWidth}
                height={window.innerHeight}
                onUpdate={(err, result) => {
                    
                }}
            />
        </div>
    )
}