import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../ducks/userReducer";

const Login = props => {
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        props.login(inputs.email, inputs.password);
        props.closeModal();
        props.toggleRefresh();
    };

    return (
        <div>
            <p>Email</p>
            <input name="email" onChange={onChange} />
            <p>Password</p>
            <input name="password" onChange={onChange} />
            <button onClick={handleLogin}>Sign In</button>
        </div>
    );
};

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { login }
)(Login);
