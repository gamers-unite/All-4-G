import React, { useEffect} from 'react';
import { connect } from 'react-redux'; 
import { getRequestById } from '../ducks/requestReducer';
import styled from "styled-components";
import AccountCircle from '@material-ui/icons/AccountCircle';

const Request = (props) => {

  useEffect( () => { props.getRequestById() }, [])

  const renderTeam = (num) => {
    let team = []
    for(let i=0; i < num -1 ; i++){
      team.push(<AccountCircle/>)
    }
    return team
  };

  console.log(props.id)

  return(
      <RequestInfo>
        <div>
          {props.request.display_name}
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
  )
}

const mapStateToProps = state => {
  return {
    request: state.request.requests
  }
}

export default connect(mapStateToProps, { getRequestById })(Request);

const RequestInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  margin: 5px 0;

  .mini_avatar {
    height: 25px;
    width: 25px;
    border-radius: 50%;
  }

  img {
    height: 100px;
    width: 100px;
  }
`