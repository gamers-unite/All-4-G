import React, { useEffect } from 'react';
import Request from './Request'
import { connect } from 'react-redux';
import { gameByUrl, allGames } from '../ducks/gamesReducer';
import { getRequests } from '../ducks/requestReducer';
import styled from "styled-components";

const GamePage = (props) => {

  useEffect( () => { 
    let url = props.location.pathname.replace('/', '');
    props.gameByUrl(url);
  }, [])

  useEffect( () => { 
    props.getRequests(props.game.game_id)
  }, [props.game])

  const requestMap = props.gameRequests.map( (e,i) => {
    console.log(e.req_id)
    return (
      <Request 
        key={i}
        id={e.req_id}
      />
    )
  })

  return (
    <>
      <GameInfo>
        <img src={props.game.logo} alt='alt'/>
        <div></div>
        <p>{props.game.info}</p>
        <h3>{props.game.max_party}</h3>
      </GameInfo>
      <div>
        <h1>Requests</h1>
        <div>
          {requestMap}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    gameRequests: state.request.gameRequests,
    team: state.request.team,
    game: state.games.game,
    allOfGames: state.games.allOfGames
  }
}

export default connect(mapStateToProps, { gameByUrl, getRequests, allGames })(GamePage);

const GameInfo = styled.div`
  position: relative;
  display: flex;
  background: #333333;
  height: 400px;

  div {
    position: absolute;
    bottom: 0;
    height: 3px;
    background: white;
    width: 80%;
    left: 10%;
    border: 1px solid black;
  }

  img {
    margin: auto 0;
    height: 300px;
    width: 200px;
  }

  p, h3 {
    color: white;
  }
`