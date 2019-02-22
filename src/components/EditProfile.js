import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { storage } from "./firebase";
import ImageUpload from "./ImageUpload";

import styled from 'styled-components';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    modal: {
        position: "absolute",
        float: "left",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: theme.spacing.unit * 40,
        padding: theme.spacing.unit * 4,
        background: "rgba(192, 192, 192, 0.9)",
        borderRadius: "5%",
        outline: "none",
        webkitBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
        mozBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
        boxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)"
    }
});

const EditProfile = props => {
    const { classes } = props;
    const [inputs, setInputs] = useState({
        display_name: props.display_name,
        avatar: props.avatar,
        image: null,
        url: "",
        blizzard: props.blizzard,
        epic: props.epic,
        ps4: props.ps4,
        riot: props.riot,
        steam: props.steam,
        xbox: props.xbox
    });

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setInputs({ ...inputs, image });
        }
    };

    const handleUpload = event => {
        event.preventDefault();
        const { email } = props;
        const uploadTask = storage
            .ref(`images/avatars/${email}`)
            .put(inputs.image);
        uploadTask.on(
            "state_changed",
            snapshot => { //progress function 
            },
            error => { //error function
                console.log(error);
            },
            () => { //complete function
                storage
                    .ref("images/avatars")
                    .child(email)
                    .getDownloadURL()
                    .then(url => {
                        setInputs({ ...inputs, avatar: url, url });
                    });
            }
        );
    };

    const submitEdit = e => {
        e.preventDefault();
        const { display_name, avatar, blizzard, epic, ps4, riot, steam, xbox } = inputs;
        axios
            .put("/users/update", { display_name, avatar, blizzard, epic, ps4, riot, steam, xbox })
            .then(() => { props.closeEdit();
            });
    };

    return (
        <>
            <Form className={classes.modal} onSubmit={submitEdit}>
                <Logo src='https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2FLogo.png?alt=media&token=205cab94-8e86-4908-8d4b-1ad20390d3d1'></Logo>
                <p>Display Name</p>
                <input
                    name="display_name"
                    defaultValue={props.display_name}
                    onChange={onChange}
                />
                <p>Blizzard</p>
                <input
                    name="blizzard"
                    defaultValue={props.blizzard}
                    onChange={onChange}
                />
                <p>Epic</p>
                <input
                    name="epic"
                    defaultValue={props.epic}
                    onChange={onChange}
                />
                <p>Playstation</p>
                <input
                    name="ps4"
                    defaultValue={props.ps4}
                    onChange={onChange}
                />
                <p>Riot</p>
                <input
                    name="riot"
                    defaultValue={props.riot}
                    onChange={onChange}
                />
                <p>Steam</p>
                <input
                    name="steam"
                    defaultValue={props.steam}
                    onChange={onChange}
                />
                <p>Xbox</p>
                <input
                    name="xbox"
                    defaultValue={props.xbox}
                    onChange={onChange}
                />
                <ImageUploadFormat>
                    <ImageUpload
                        handleFileChange={handleFileChange}
                        image={inputs.image}
                        handleUpload={handleUpload}
                        avatar={props.avatar}
                        url={props.url}
                    />
                </ImageUploadFormat>
                <ButtonFormat>
                    <Button style={{cursor: 'pointer'}} onClick={submitEdit} variant='contained'>Submit</Button>
                    <Button style={{cursor: 'pointer'}} onClick={props.closeEdit} variant='contained'>Cancel</Button>
                </ButtonFormat>
            </Form>
        </>
    );
};

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);

const Form = styled.form`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    font-weight: bold;
`;

const Logo = styled.img`
    height: 3em;
    width: 125%;
`;

const ButtonFormat = styled.div`
    display: flex;
    width: 100%;
    padding-top: 1em;
    justify-content: space-evenly;
`;

const ImageUploadFormat = styled.div`
    display: felx;
    width: 100%;
    align-items: space-evenly;
    justify-content: center;
    width: 100%;
`;