import React from 'react';
import { connect } from 'react-redux';


const Request = (props) => {
  const mapTeam = props.team.map( ( e, i ) => {
    const user = (
      <div name={e.id}>
        <img src={e.avatar || 'default'} alt='team'/>
      </div>
    )
    return user.repeat(props.teamLength)
  })
  
  return (
    <>
      <div>
        <img src={props.request.avatar} alt='avatar'/>
        <h3>{props.request.user}</h3>
      </div>
      <p>{props.request.info}</p>
      <div>
        {
          //map function with potential users
          mapTeam
        }
      </div>
      <div>
        Chat
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    request: state.request.request,
    team: state.request.team
  }
}

export default connect( mapStateToProps, {})(Request);