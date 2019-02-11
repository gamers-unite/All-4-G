import React, { useState } from "react";
import { login } from "../ducks/userReducer";

const Login = () => {
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const onChange = (e, name) => {
        setInputs({ ...inputs, [name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={() => login(inputs.email, inputs.password)}>
                <p>Email</p>
                <input name="email" onChange={e => onChange(e)} />
                <p>Password</p>
                <input name="password" onChange={e => onChange(e)} />
                <button onClick={() => login(email, password)}>Sign In</button>
            </form>
        </div>
    );
};

export default Login;
