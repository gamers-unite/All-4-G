import React, { useEffect } from "react";
import { connect } from "react-redux";
import { allGames } from "../ducks/gamesReducer";
import styled from "styled-components";
import Carousel from "./Carousel";
import Game from "./Game";

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
          url={e.url}
        />
      );
    });
  }

  return (
    <>
      <GameWrap>
        {props.games[0] && <Carousel games={props.games} />}
        <h1> Game List </h1>
        <GameList>
          {gameMap}
        </GameList>
      </GameWrap>
    </>
  );
};

const mapStateToProps = state => {
  return {
    games: state.games.allOfGames,
    user: state.user.user
  };
};

export default connect( mapStateToProps, { allGames } )(Home);

const GameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GameWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  background: #333333;

  h1 {
    margin-top: 5vh;
    color: #ffffffce;
    text-decoration: underline;
  }
`;
