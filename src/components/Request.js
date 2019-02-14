import React, { useEffect, useState} from 'react';
import styled from "styled-components";
import AccountCircle from '@material-ui/icons/AccountCircle';
import axios from 'axios'

const Request = (props) => {

  const [request, updateRequest] = useState([]) 

  useEffect( () => { 
    axios.post("/api/requests/id", { req_id: props.id })
      .then( response => updateRequest(response.data)) 
    }, [])

  const renderTeam = (num) => {
    let team = []
    for(let i=0; i < num ; i++){
      if( request[i] ){
        team.push(<img key={i} className='mini_avatar player' src={request[i].avatar} alt='mini'/>)
      } else {
        team.push(<AccountCircle key={i} className='mini_avatar'/>)
      }
    }
    return team
  };

  return(
    <>
      {request[0] && 
        <RequestInfo>
        <div>
          <img src={props.creatorImg} alt='creator avatar'/>
          {props.creatorName}
        </div>
        <div>
          <p>{request[0].info}</p>
        </div>
        <div className='team_bar'>
          {renderTeam(request[0].team_length)}
        </div>
        {/* <div>
          <img src={e.avatar} className='mini_avatar'/>
          {renderTeam(e.team_length)}
        </div>
        <img src={e.avatar} alt='avatar'/>
        <h3>{e.display_name}</h3>
        <p>{e.info}</p>
        <h2>{e.team_length}</h2> */}
      </RequestInfo>
      }
    </>
  )
}

export default Request;

const RequestInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  margin: 5px 0;

  .team_bar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .mini_avatar {
    height: 35px;
    width: 35px;
    border-radius: 50%;
  }

  .player {
    height: 29px;
    width: 29px;
    background: black;
    margin: 2px;
  }

  img {
    height: 100px;
    width: 100px;
  }
`