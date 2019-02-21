import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
// import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

//Display as modal in parent component

// const styles = theme => ({
//     modalWrapper: {
//         width: "100vw",
//         height: "100vh",
//         alignItems: "center",
//         justifyContent: "center"
//     },

//     modal: {
//         position: "absolute",
//         float: "left",
//         left: "50%",
//         top: "50%",
//         transform: "translate(-50%, -50%)",
//         width: theme.spacing.unit * 40,
//         // boxShadow: theme.shadows[10],
//         padding: theme.spacing.unit * 4,
//         background: "rgba(192, 192, 192, 0.9)",
//         borderRadius: "5%",
//         outline: "none",
//         webkitBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
//         mozBoxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)",
//         boxShadow: "24px 22px 23px 9px rgba(0,0,0,0.75)"
//     }
// });

export const createNumArray = num => {
    const numArr = [];
    for (let i = 2; i <= num; i++) {
        numArr.push(i);
    }
    return numArr;
};

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
            <RequestModalButtons>
                <Button variant='contained' onClick={submitRequest}>Submit</Button>
                <Button variant='contained' onClick={props.closeRequest}>Cancel</Button>
            </RequestModalButtons>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps)(CreateRequest);


const RequestModalButtons = styled.div`
    display: flex;
    justify-content: center;
    justify-content: space-around;
    align-items: center;
    padding-top: 1em;
    width 85%;
    padding-left: 1em;
    cursor: pointer;
`;

// const Modal = styled.div`
//     background: #333333;
//     border: .5em solid black;
//     borderRadius: 10%;
//     outline: none;
// `