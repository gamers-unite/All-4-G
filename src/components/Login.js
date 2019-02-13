import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../ducks/userReducer";

const Login = props => {
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const onChange = (e, name) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        props.login(inputs.email, inputs.password);
        props.closeModal();
    };

    return (
        <div>
            <p>Email</p>
            <input name="email" onChange={e => onChange(e)} />
            <p>Password</p>
            <input name="password" onChange={e => onChange(e)} />
            <button onClick={handleLogin}>Sign In</button>
        </div>
    );
};

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { login }
)(Login);
