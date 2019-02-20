import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';

const ImageUpload = props => {
    return (
        <div className="imageUpload">
            <input type="file" onChange={props.handleFileChange} />
            <Button variant='contained' onClick={props.handleUpload}>Upload Image</Button>
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
