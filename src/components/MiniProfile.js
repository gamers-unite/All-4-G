import React, { useEffect } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { getCurrentUser } from "../ducks/userReducer";
import styled from 'styled-components';

//PASS IN GAME OBJECT WITH PLATFORMS AS PROPS

const User = props => {
    useEffect(() => {
        props.getCurrentUser();
    }, []);

    const platform = props.platforms.map(e => {
        return (
            <>
                <p>{e}:</p>
                <p>{props.user[e.toLowerCase()]}</p>
            </>
        );
    });

    return (
        <>
            {props.user && (
                <Format>
                    <Avatar src={props.user.avatar} alt="avatar" />
                    <h1>{props.user.display_name}</h1>
                    <div>{platform}</div>
                </Format>
            )}
        </>
    );
};

const mapStateToProps = state => {
    return { user: state.user.user };
};

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(User);

const Format = styled.div`
    width: 75%
    border: 1px solid #ffffff;
`