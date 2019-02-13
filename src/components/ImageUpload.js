import React from "react";
import Avatar from "@material-ui/core/Avatar";

const ImageUpload = props => {
    return (
        <div className="imageUpload">
            <input type="file" onChange={props.handleFileChange} />
            <button onClick={props.handleUpload}>Upload Image</button>
            <Avatar
                src={props.url || props.avatar}
                alt="Uploaded img"
                height="100"
                width="100"
            />
        </div>
    );
};

export default ImageUpload;
