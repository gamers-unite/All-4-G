import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameByUrl, allGames } from '../ducks/gamesReducer';
import { getRequests } from '../ducks/requestReducer';
import styled from "styled-components";

const Request = (props) => {

  const startUp = async () => {
    let url = props.location.pathname.replace('/', '');
    let fillProps = await props.gameByUrl(url);
    let id = fillProps.value.data[0].game_id
    if(id){
      props.getRequests(id)
      props.allGames()
    }
  }

  useEffect( () => { startUp() }, [])
  
  const requestMap = props.gameRequests.map( (e,i) => {
    return (
      <div key={i}>
        <p>{e.info}</p>
        <h2>{e.team_length}</h2>
      </div>
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

export default connect(mapStateToProps, { gameByUrl, getRequests, allGames })(Request);

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