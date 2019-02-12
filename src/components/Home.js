import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { allGames } from '../ducks/gamesReducer';
import Carousel from './Carousel';
import Games from './Game';
import User from './User';

const Home = (props) => {

  useEffect( () => props.allGames(), []);

if(props.games){
  var filterGames = props.games.filter( ( e, i ) => {
    for(let j=i+1; j < props.games.length; j++){
      if( e[i] === props.games[j]){
        return e[i]
      }
    }
  })
  console.log(filterGames)
}


  // const gameMap = filterGame.map( ( e, i ) => {
  //   return (
  //     <Games key={i} game_id={e.game_id} title={e.title} platform={e.platform} background_img={e.background_img} info={e.info} logo={e.logo}/>
  //   )
  // })

  return (
    <>
      {/* <Carousel/> */}
      <div>
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