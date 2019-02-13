import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { storage } from "./firebase";
import { getCurrentUser } from "../ducks/userReducer";
import ImageUpload from "./ImageUpload";

const Profile = props => {
    const [inputs, setInputs] = useState({
        display_name: "",
        avatar: "",
        image: null,
        newImg: "",
        blizzard: "",
        epic: "",
        ps4: "",
        riot: "",
        steam: "",
        xbox: ""
    });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const openEdit = () => {
        setEdit(true);
        setInputs({
            display_name: props.user.display_name,
            avatar: props.user.avatar,
            image: null,
            newImg: "",
            blizzard: props.user.blizzard,
            epic: props.user.epic,
            ps4: props.user.ps4,
            riot: props.user.riot,
            steam: props.user.steam,
            xbox: props.user.xbox
        });
    };

    const closeEdit = () => {
        setEdit(false);
        setInputs({});
    };

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setInputs({ image });
        }
    };

    const handleUpload = event => {
        event.preventDefault();
        const { email } = props.user;
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
                    .ref("images")
                    .child(email)
                    .getDownloadURL()
                    .then(url => setInputs({ newImg: url }));
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
            .put("./users/update", {
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
                setEdit(false);
            });
    };
    return (
        <div>
            <img src={props.user.avatar} alt="avatar" />
            <h1>{props.user.display_name}</h1>
            <h2>{props.user.email}</h2>
            {props.user.blizzard && (
                <>
                    <p>Blizzard:</p>
                    <p>{props.user.blizzard}</p>
                </>
            )}
            {props.user.epic && (
                <>
                    <p>Epic:</p>
                    <p>{props.user.epic}</p>
                </>
            )}
            {props.user.ps4 && (
                <>
                    <p>PlayStation:</p>
                    <p>{props.user.ps4}</p>
                </>
            )}
            {props.user.riot && (
                <>
                    <p>Riot:</p>
                    <p>{props.user.riot}</p>
                </>
            )}
            {props.user.steam && (
                <>
                    <p>Steam:</p>
                    <p>{props.user.steam}</p>
                </>
            )}
            {props.user.xbox && (
                <>
                    <p>Xbox:</p>
                    <p>{props.user.xbox}</p>
                </>
            )}
            {!edit && <button onClick={openEdit}>Edit</button>}
            {edit && (
                <div>
                    <form onSubmit={submitEdit}>
                        <ImageUpload
                            handleFileChange={handleFileChange}
                            handleUpload={handleUpload}
                            avatar={props.avatar}
                            newImg={inputs.newImg}
                        />
                        <p>Display Name</p>
                        <input
                            name="display_name"
                            defaultValue={props.user.display_name}
                            onChange={onChange}
                        />
                        <p>Blizzard</p>
                        <input
                            name="blizzard"
                            defaultValue={props.user.blizzard}
                            onChange={onChange}
                        />
                        <p>Epic</p>
                        <input
                            name="epic"
                            defaultValue={props.user.epic}
                            onChange={onChange}
                        />
                        <p>Playstation</p>
                        <input
                            name="ps4"
                            defaultValue={props.user.ps4}
                            onChange={onChange}
                        />
                        <p>Riot</p>
                        <input
                            name="riot"
                            defaultValue={props.user.riot}
                            onChange={onChange}
                        />
                        <p>Steam</p>
                        <input
                            name="steam"
                            defaultValue={props.user.steam}
                            onChange={onChange}
                        />
                        <p>Xbox</p>
                        <input
                            name="riot"
                            defaultValue={props.user.xbox}
                            onChange={onChange}
                        />
                        <button onClick={submitEdit}>Submit</button>
                    </form>
                    <button onClick={closeEdit}>Cancel</button>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return { user: state.user.user };
};

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(Profile);
