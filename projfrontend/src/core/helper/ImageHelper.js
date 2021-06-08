import React from 'react'

const ImageHelper = ({product}) => {

    const imageurl = product ? product.image
    : `https://wallpapercave.com/w/wp6484071`

    return (
        <div className="rounded border border-success p-2">
            <img
            src={imageurl}
            style={{maxHeight="100%", maxWidth="100%"}}
            className="mb-3 rounded"
            />
        </div>
    )
}

export default ImageHelper