import React, { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../ducks/userReducer";
import styled from "styled-components";

const Register = props => {
    const [inputs, setInputs] = useState({
        email: "",
        display_name: "",
        password: "",
        blizzard: "",
        epic: "",
        ps4: "",
        riot: "",
        steam: "",
        xbox: ""
    });

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleRegister = e => {
        e.preventDefault();
        props.addUser(
            inputs.email,
            inputs.display_name,
            inputs.password,
            inputs.blizzard,
            inputs.epic,
            inputs.ps4,
            inputs.riot,
            inputs.steam,
            inputs.xbox
        );
        props.closeModal();
        props.toggleRefresh();
    };

    return (
        <RegisterStyle>
            <form onSubmit={handleRegister}>
                Register User
                <p> Email</p>
                <input name="email" onChange={onChange} />
                <p>Display Name</p>
                <input name="display_name" onChange={onChange} />
                <p>Password</p>
                <input name="password" onChange={onChange} />
                <p>Blizzard</p>
                <input name="blizzard" onChange={onChange} />
                <p>Epic</p>
                <input name="epic" onChange={onChange} />
                <p>Playstation</p>
                <input name="ps4" onChange={onChange} />
                <p>Riot</p>
                <input name="riot" onChange={onChange} />
                <p>Steam</p>
                <input name="steam" onChange={onChange} />
                <p>Xbox</p>
                <input name="xbox" onChange={onChange} />
                <button onClick={handleRegister}>Submit</button>
            </form>
        </RegisterStyle>
    );
};

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { addUser }
)(Register);

const RegisterStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: row;
`;
