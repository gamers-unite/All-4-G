import React, { useState } from "react";
import { addUser } from "./ducks/userReducer";

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

    const onChange = (name, value) => {
        setInputs({ ...inputs, [name]: value });
    };

    return (
        <div>
            <form
                onSubmit={() =>
                    addUser(
                        email,
                        display_name,
                        password,
                        blizzard,
                        epic,
                        ps4,
                        riot,
                        steam,
                        xbox
                    )
                }
            >
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
                <input name="riot" onChange={onChange} />
                <button
                    onClick={() =>
                        addUser(
                            email,
                            display_name,
                            password,
                            blizzard,
                            epic,
                            ps4,
                            riot,
                            steam,
                            xbox
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
