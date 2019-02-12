import React, { useEffect } from "react";
import { connect } from "react-redux";
import { allGames } from "../ducks/gamesReducer";
import styled from "styled-components";
// import Carousel from './Carousel';
import Game from "./Game";
import User from "./User";

const Home = props => {
    useEffect(() => {
        props.allGames();
    }, []);

    let gameMap = [];
    if (props.games) {
        gameMap = props.games.map((e, i) => {
            return (
                <Game
                    key={i}
                    game_id={e.game_id}
                    title={e.title}
                    background_img={e.background_img}
                    logo={e.logo}
                />
            );
        });
    }

    return (
        <>
            <p>Navbar</p>
            <p>Carousel</p>
            {/* <Carousel games={props.games}/> */}
            <GameWrap>{gameMap}</GameWrap>
            <User email={props.user.email} />
        </>
    );
};

const mapStateToProps = state => {
    return {
        games: state.games.allGames,
        user: state.user.user
    };
};

export default connect(
    mapStateToProps,
    { allGames }
)(Home);

const GameWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: scroll;
    height: 60vh;
    width: 100vw;
    margin: 0 auto;
    background: #333333;
`;
