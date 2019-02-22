import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../ducks/userReducer";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

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
            <Logo src='https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2FLogo.png?alt=media&token=205cab94-8e86-4908-8d4b-1ad20390d3d1'></Logo>
            <LoginFormat>
                <>
                <p>Email</p>
                <input name="email" onChange={onChange} />
                </>
                <>
                <p>Password</p>
                <input name="password" type="password" onChange={onChange} />
                </>
            </LoginFormat>
            <SignIn>
                <Button variant='contained' style={{cursor: 'pointer'}} onClick={handleLogin}>Sign In</Button>
            </SignIn>
        </div>
    );
};

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { login }
)(Login);

const Logo = styled.img`
    display: flex;
    justify-content: flex-end; 
    height: 4em;
    width: 100%;
`;

const SignIn = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 2em; 
`;

const LoginFormat = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-weight: bold;

    input{
        width: 50%;
    }
`;