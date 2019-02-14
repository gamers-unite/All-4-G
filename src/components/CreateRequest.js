import React, { useState } from "react";
import axios from "axios";

//Display as modal in parent component

const CreateRequest = props => {
    const [inputs, setInputs] = useState({
        info: "",
        teamLength: 2,
        platform: props.platforms[0]
    });

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const submitRequest = () => {
        const { team_length, platform, info } = inputs;
        axios
            .post("/api/requests/add", { team_length, platform, info })
            .then(() => {
                props.closeModal();
            });
    };

    const createNumArray = num => {
        const numArr = [];
        for (let i = 2; i <= num; i++) {
            numArr.push(+num);
        }
        return numArr;
    };

    const numberOptions = createNumArray(props.max_party).map(num => {
        <option name="team_length" value={num}>
            {num}
        </option>;
    });

    const platforms = props.platforms.map(platform => {
        <option name="platform" value={platform}>
            {platform}
        </option>;
    });

    return (
        <div>
            <p>Platform</p>
            <select onChange={onChange}>{platforms}</select>
            <p>Party Size</p>
            <select onChange={onChange}>{numberOptions}</select>
            <p>Request Info</p>
            <input
                onChange={onChange}
                name="info"
                placeholder="Enter request info..."
            />
            <button onSubmit={submitRequest}>Submit</button>
        </div>
    );
};

export default CreateRequest;
