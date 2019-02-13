import React, { useEffect } from "react";
import { connect } from "react-redux";
import { allGames } from "../ducks/gamesReducer";
import styled from "styled-components";
import Carousel from './Carousel';
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
      
      <GameWrap>
       {props.games[0] && <Carousel games={props.games}/>}
        { gameMap }
      </GameWrap>
      {/* <User email={props.user.email} /> */}
    </>
  )
}

const mapStateToProps = state => {
  return {
    games: state.games.allGames,
    user: state.user.user
  }
}

export default connect(
    mapStateToProps,
    { allGames }
)(Home);

const GameWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: scroll;
    height: 100vh;
    width: 100vw;
    margin: 0 auto;
    background: #333333;
    // border: 1px solid green;
`;
