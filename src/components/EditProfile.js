import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { storage } from "./firebase";
import ImageUpload from "./ImageUpload";

const styles = theme => ({
    modal: {
        position: "absolute",
        float: "left",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: theme.spacing.unit * 50,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        background: "#fff"
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
            snapshot => {
                //progress function
            },
            error => {
                //error function
                console.log(error);
            },
            () => {
                //complete function
                storage
                    .ref("images/avatars")
                    .child(email)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        setInputs({ ...inputs, avatar: url, url });
                    });
            }
        );
    };

    const submitEdit = e => {
        e.preventDefault();
        const {
            display_name,
            avatar,
            blizzard,
            epic,
            ps4,
            riot,
            steam,
            xbox
        } = inputs;
        axios
            .put("/users/update", {
                display_name,
                avatar,
                blizzard,
                epic,
                ps4,
                riot,
                steam,
                xbox
            })
            .then(() => {
                props.closeEdit();
            });
    };

    return (
        <>
            <form className={classes.modal} onSubmit={submitEdit}>
                <ImageUpload
                    handleFileChange={handleFileChange}
                    handleUpload={handleUpload}
                    avatar={props.avatar}
                    url={props.url}
                />
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
                <button onClick={submitEdit}>Submit</button>
                <button onClick={props.closeEdit}>Cancel</button>
            </form>
        </>
    );
};

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
