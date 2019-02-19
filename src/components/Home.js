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
        <GameCards>
          <Game
            key={i}
            game_id={e.game_id}
            title={e.title}
            background_img={e.background_img}
            logo={e.logo}
            url={e.url}
          />
        </GameCards>
      );
    });
  }

  return (
    <BackgroundImg>
      <GameWrap>
        {props.games[0] && <Carousel games={props.games} />}
        <div style={{width: '60%'}}>
          <h1> Game List </h1>
          <GameList>
            
            {gameMap}
          </GameList>
        </div>
      </GameWrap>
    </BackgroundImg>
  );
};

const mapStateToProps = state => {
  return {
    games: state.games.allOfGames,
    user: state.user.user
  };
};

export default connect( mapStateToProps, { allGames } )(Home);

const BackgroundImg = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2Fbackground.jpg?alt=media&token=88fde558-e096-4a32-9b76-c7bb9eeb3b3c");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
`

const GameCards = styled.div`
  border: 2em solid black;
  border-radius: 25%;
  margin: 4em auto;
  height: 15em;
  width: 12em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 2em 2em black;
`;

const GameList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 3vh;
`;

const GameWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  height: 100vh;
  width: 100vw;
  background: #333333;
  align-items: space-between;

  h1 {
    margin-top: 8vh;
    color: #ffffffce;
    text-shadow: 3px 3px black;
  }
`;
