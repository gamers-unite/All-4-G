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
            info={e.info}
            background_img={e.background_img}
            logo={e.logo}
            url={e.url}
          />
        </GameCards>
      );
    });
  }

  return (
      <GameWrap>
        {props.games[0] && <Carousel games={props.games} />}
        <div className='home_div' img='https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2Fbackground.jpg?alt=media&token=88fde558-e096-4a32-9b76-c7bb9eeb3b3c'>
          <h1> Game List </h1>
          <GameList>
            {gameMap}
          </GameList>
        </div>
      </GameWrap>
  );
};

export const mapStateToProps = state => {
  return {
    games: state.games.allOfGames,
    user: state.user.user
  };
};

export default connect(mapStateToProps, { allGames })(Home);

const GameCards = styled.div`
//   width: 100%;
//   border: 2em solid black;
//   border-radius: 25%;
//   margin: 4em auto;
//   // height: 15em;
//   // width: 12em;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-shadow: 2em 2em black;
`;

const GameList = styled.div`
  display: flex;
  width: 100%;
  // background: blue;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 3vh;
`;

const GameWrap = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: space-between;
  width: 100vw;
  // overflow: hidden;
  // flex-wrap: wrap;
  // overflow: scroll;
  
  .home_div {
    display: flex;
    flex-direction: column;
    align-items: center;
    // background: blue;
    // background: #333333;
    background: url('https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2Fbackground.jpg?alt=media&token=88fde558-e096-4a32-9b76-c7bb9eeb3b3c') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    box-shadow: inset 0px 15px 25px 8px rgba(0,0,0,0.75);
  }

  h1 {
    margin-top: 8vh;
    color: #ffffffce;
    text-shadow: 3px 3px black;
  }
`;
