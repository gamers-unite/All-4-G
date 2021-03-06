import React from "react";

import styled from 'styled-components';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';

const ImageUpload = props => {
    return (
        <UploadFormat>
            {props.image && 
            <Button variant='contained' style={{cursor: 'pointer'}} onClick={props.handleUpload}>Upload</Button>}
            <Avatar
                src={props.url || props.avatar}
                alt="Uploaded img"
                height="100"
                width="100"
                paddingottom="1em"
            />
            <input type="file" style={{cursor: 'pointer'}} onChange={props.handleFileChange} />
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
`;