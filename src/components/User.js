import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUser } from "../ducks/userReducer";

//PASS IN GAME OBJECT WITH PLATFORMS AS PROPS
//PASS IN USER EMAIL AS PROPS

const User = props => {
    useEffect(() => {
        props.getUser(props.email);
    }, []);

    const game = props.game || {};

    return (
        <div>
            <img src={props.user.avatar} />
            <h1>{props.user.display_name}</h1>
            {/* CHECK IF GAME HAS PLATFORM, THEN CHECK IF USER HAS PLATFORM ID */}
            {game.blizzard && props.user.blizzard && (
                <>
                    <p>Blizzard:</p>
                    <p>{props.user.blizzard}</p>
                </>
            )}
            {game.epic && props.user.epic && (
                <>
                    <p>Epic:</p>
                    <p>{props.user.epic}</p>
                </>
            )}
            {game.ps4 && props.user.ps4 && (
                <>
                    <p>PlayStation:</p>
                    <p>{props.user.ps4}</p>
                </>
            )}
            {game.riot && props.user.riot && (
                <>
                    <p>Riot:</p>
                    <p>{props.user.riot}</p>
                </>
            )}
            {game.steam && props.user.steam && (
                <>
                    <p>Steam:</p>
                    <p>{props.user.steam}</p>
                </>
            )}
            {game.xbox && props.user.xbox && (
                <>
                    <p>Xbox:</p>
                    <p>{props.user.xbox}</p>
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return { user: state.user.otherUser };
};

export default connect(
    mapStateToProps,
    { getUser }
)(User);
