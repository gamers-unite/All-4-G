import React, { useState } from "react";
import { addUser } from "../ducks/userReducer";

const Register = () => {
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

    return (
        <div>
            <form>
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
                <button
                    onClick={() =>
                        addUser(
                            inputs.email,
                            inputs.display_name,
                            inputs.password,
                            inputs.blizzard,
                            inputs.epic,
                            inputs.ps4,
                            inputs.riot,
                            inputs.steam,
                            inputs.xbox
                        )
                    }
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Register;