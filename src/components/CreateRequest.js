import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

//Display as modal in parent component

const CreateRequest = props => {
    const [inputs, setInputs] = useState({
        info: "",
        team_length: 2,
        platform: props.platforms[0]
    });

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const submitRequest = async () => {
        const { game_id } = props;
        const user_id = props.user.id;
        const { team_length, platform, info } = inputs;
        let result = await axios.post("/api/requests/add", {
            team_length,
            game_id,
            platform,
            info
        });
        const { req_id } = result.data[0];
        await axios
            .post("/api/teams", { user_id, req_id })
            .then(() => props.closeRequest());
    };

    const createNumArray = num => {
        const numArr = [];
        for (let i = 2; i <= num; i++) {
            numArr.push(i);
        }
        return numArr;
    };

    const numberOptions = createNumArray(props.max_party).map(num => {
        return (
            <option name="team_length" value={num}>
                {num}
            </option>
        );
    });

    const platforms = props.platforms.map(platform => {
        return (
            <option name="platform" value={platform}>
                {platform}
            </option>
        );
    });

    return (
        <div className={props.style}>
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
            <button onClick={submitRequest}>Submit</button>
            <button onClick={props.closeRequest}>Cancel</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps)(CreateRequest);
