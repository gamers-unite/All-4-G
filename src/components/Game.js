import React from 'react';
import styled from 'styled-components';

const Game = (props) => {
  return (
    <GameLogo>
      <img src={props.logo} alt='logo'/>
    </GameLogo>
  )
}

export default Game;

const GameLogo = styled.div`
img {
  height: 250px;
  width: 200px;
  cursor: pointer;
  margin: 5vw;
  }
`