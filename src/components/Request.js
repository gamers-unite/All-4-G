import React from 'react';
import { connect } from 'react-redux';


const Request = () => {
  const mapTeam = props.team.map( ( e, i ) => {
    const user = (
      <div name={e.id}>
        <img src={e.avatar || 'default'}/>
      </div>
    )
    return user.repeat(props.teamLength)
  })
  
  return (
    <>
      <div>
        <img src={props.request.avatar}/>
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