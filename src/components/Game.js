import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';


const Game = (props) => {
  return (
    <GameLogo>
      <Link to={`/${props.url}`}>
        <img src={props.logo} alt='logo'/>
      </Link>
    </GameLogo>
  )
}

export default withRouter(Game);

const GameLogo = styled.div`
img {
  height: 250px;
  width: 200px;
  cursor: pointer;
  margin: 5vw;
  }
`