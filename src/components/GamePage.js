import React, { useEffect, useState } from 'react';
import Request from './Request'
import styled from "styled-components";
import axios from 'axios';

const GamePage = (props) => {

  const [game, updateGame] = useState({});
  const [request, updateRequest] = useState([])

  const fillGame = async () => {
    let url = props.location.pathname.replace('/', '');
    let result = await axios.post('/api/games/url', {url})
    updateGame(result.data[0])
  }

  const fillRequest = async () => {
    let fillReq = await axios.post("/api/requests/game", {game_id: game.game_id})
    updateRequest(fillReq.data)
  }

  useEffect( () => { fillGame() }, [] )
  useEffect( () => { fillRequest() }, [game] )

  const requestMap = request.map( (e,i) => {
    return (
      <Request 
        key={i}
        id={e.req_id}
        creatorImg={e.avatar}
        creatorName={e.display_name}
      />
    )
  })

  return (
    <>
      <GameInfo>
        <img src={game.logo} alt='alt'/>
        <div></div>
        <p>{game.info}</p>
        <h3>{game.max_party}</h3>
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

export default GamePage;

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