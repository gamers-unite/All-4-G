import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import styled from 'styled-components';


const ImageUpload = props => {
    return (
        <UploadFormat>
            {props.image && 
            <Button variant='contained' onClick={props.handleUpload}>Upload</Button>}
            <Avatar
                src={props.url || props.avatar}
                alt="Uploaded img"
                height="100"
                width="100"
                paddingottom="1em"
            />
            <input type="file" onChange={props.handleFileChange} />
        </UploadFormat>
    );
};

export default ImageUpload;

const UploadFormat = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    justify-conetent: center;
`
