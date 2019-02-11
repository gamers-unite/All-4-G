import React, { useState } from "react";

const Login = () => {
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const onChange = (e, name) => {
        setInputs({ ...inputs, [name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={}>
                <p>Email</p>
                <input name="email" onChange={e => onChange(e, name)} />
                <p>Password</p>
                <input name="password" onChange={e => onChange(e, name)} />

                <button onClick={}>Sign In</button>
            </form>
        </div>
    );
};

export default Login;
