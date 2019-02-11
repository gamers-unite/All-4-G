import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import ImageUpload from "./ImageUpload";

const Profile = () => {
    const [edit, toggleEdit] = useState(false);
    const [inputs, setInputs] = useState({
        display_name: props.display_name,
        avatar: props.avatar,
        image: null,
        newImg: "",
        blizzard: props.blizzard,
        epic: props.epic,
        ps4: props.ps4,
        riot: props.riot,
        steam: props.steam,
        xbox: props.xbox
    });

    const onChange = (name, value) => {
        setInputs({ ...inputs, [name]: value });
    };

    const handleFileChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setInputs({ image });
        }
    };

    handleUpload = event => {
        event.preventDefault();
        const { email } = props;
        const uploadTask = storage.ref(`images/avatars/${email}`).put(image);
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
        axios.post("./users/update", {
            display_name,
            avatar,
            blizzard,
            epic,
            ps4,
            riot,
            steam,
            xbox
        });
    };
    return (
        <div>
            <img src={props.avatar} alt="avatar" />
            <h1>{props.display_name}</h1>
            <h2>{props.email}</h2>
            {props.blizzard && (
                <>
                    <p>Blizzard:</p>
                    <p>{props.blizzard}</p>
                </>
            )}
            {props.epic && (
                <>
                    <p>Epic:</p>
                    <p>{props.epic}</p>
                </>
            )}
            {props.ps4 && (
                <>
                    <p>PlayStation:</p>
                    <p>{props.ps4}</p>
                </>
            )}
            {props.riot && (
                <>
                    <p>Riot:</p>
                    <p>{props.riot}</p>
                </>
            )}
            {props.steam && (
                <>
                    <p>Steam:</p>
                    <p>{props.steam}</p>
                </>
            )}
            {props.xbox && (
                <>
                    <p>Steam:</p>
                    <p>{props.xbox}</p>
                </>
            )}
            <button onClick={toggleEdit(true)}>Edit</button>
            {edit && (
                <div>
                    <form onSubmit={submitEdit}>
                        <ImageUpload
                            handleFileChange={handleFileChange}
                            handleUpload={handleUpload}
                            avatar={props.avatar}
                            newImg={newImg}
                        />
                        <p>Display Name</p>
                        <input
                            name="display_name"
                            defaultValue={inputs.display_name}
                            onChange={onChange}
                        />
                        <p>Blizzard</p>
                        <input
                            name="blizzard"
                            defaultValue={inputs.blizzard}
                            onChange={onChange}
                        />
                        <p>Epic</p>
                        <input
                            name="epic"
                            defaultValue={inputs.epic}
                            onChange={onChange}
                        />
                        <p>Playstation</p>
                        <input
                            name="ps4"
                            defaultValue={inputs.ps4}
                            onChange={onChange}
                        />
                        <p>Riot</p>
                        <input
                            name="riot"
                            defaultValue={inputs.riot}
                            onChange={onChange}
                        />
                        <p>Steam</p>
                        <input
                            name="steam"
                            defaultValue={inputs.steam}
                            onChange={onChange}
                        />
                        <p>Xbox</p>
                        <input
                            name="riot"
                            defaultValue={inputs.xbox}
                            onChange={onChange}
                        />
                        <button onClick={submitEdit}>Submit</button>
                    </form>
                    <button onSubmit={() => toggleEdit(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
