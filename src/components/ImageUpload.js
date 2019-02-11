import React from "react";

const ImageUpload = props => {
    return (
        <div className="imageUpload">
            <input type="file" onChange={props.handleFileChange} />
            <button onClick={props.handleUpload}>Upload Image</button>
            <img
                src={props.newImg || props.avatar}
                alt="Uploaded img"
                height="100"
                width="100"
            />
        </div>
    );
};

export default ImageUpload;
