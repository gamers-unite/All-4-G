<<<<<<< HEAD
import React from 'react';
import PrimarySearchAppBar from './Navbar';
=======
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { allGames } from '../ducks/gamesReducer';
import styled from 'styled-components';
// import Carousel from './Carousel';
import Game from './Game';
import User from './User';

const Home = (props) => {

  useEffect( () => props.allGames(), []);

let gameMap = []
if(props.games){
  gameMap = props.games.map( ( e, i ) => {
    return (
      <Game 
        key={i}
        game_id={e.game_id}
        title={e.title} 
        background_img={e.background_img}
        logo={e.logo}
      />
    )
  })
}

>>>>>>> master

  return (
<<<<<<< HEAD
    <div>
      <PrimarySearchAppBar />
      Home
    </div>
=======
    <>
      {/* <Carousel games={props.games}/> */}
      <GameWrap>
        { gameMap }
      </GameWrap>
      <User/>
    </>
>>>>>>> master
  )
}

const mapStateToProps = state => {
  return {
    games: state.games.allGames
  }
}

export default connect( mapStateToProps, { allGames })(Home);

const GameWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  height: 60vh;
  width: 90vw;
  margin: 0 auto;
  background: #333333;
`;