import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { allGames } from '../ducks/gamesReducer';
import Carousel from './Carousel';
import Games from './Game';
import User from './User';

const Home = (props) => {

  useEffect(allGames, []);

  const gameMap = props.games.map( ( e, i ) => {
    return (
      <Games key={i} game_id={e.game_id} title={e.title} platform={e.platform} background_img={e.background_img} info={e.info} logo={e.logo}/>
    )
  })

  console.log(props)

  return (
    <>
      {/* <Carousel/> */}
      <div>
        {gameMap}
      </div>
      <User/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    games: state.games.allGames
  }
}

export default connect( mapStateToProps, { allGames })(Home);