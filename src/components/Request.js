import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from "axios";
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_URL);

const Request = props => {

    const [request, updateRequest] = useState([]);
    const [timer, setTimer] = useState(null);

    const fillRequest = async () => {
        let result = await axios.post("/api/requests/id", { req_id: props.id });
        updateRequest(result.data);
    };

    useEffect(() => { fillRequest(); }, []);
    // useEffect(() => { socket.on('connect', () => { console.log('connected') }) }, [])

    const handleJoin = () => {
      axios.post("/api/teams", { req_id: props.id, user_id: props.user.id }).then( response => {
        updateRequest(response.data)
      })
    }

    const renderTeam = num => {
        let team = [];
        for (let i = 0; i < num; i++) {
            if (request[i]) {
                team.push(
                    <img
                        key={i}
                        className="mini_avatar player"
                        src={request[i].avatar}
                        alt="mini"
                    />
                );
            } else {
                team.push(<AccountCircle key={i} className="mini_avatar" />);
            }
        }
        return team;
    };

    // function subscribeToTimer(cb) {
    //   socket.on('timer', timestamp => cb(null, timestamp));
    //   socket.emit('subscribeToTimer', 1000);
    // }
    // const subscribeToTimer = ((err, timestamp) => this.setTimer(timestamp));
    // socket.on('timer', timestamp => props(null, timestamp));
    // socket.emit('subscribeToTimer', 1000);

    return (
        <>
            {request[0] && (
                <RequestInfo>
                  <button onClick={ () => { socket.emit('test')}}></button>
                  <p>This is the timer value: {timer}</p>
                    <div>
                        <img src={props.creatorImg} alt="creator avatar" />
                        {props.creatorName}
                    </div>
                    <div>
                        <p>{request[0].info}</p>
                    </div>
                    { props.user.id && <button onClick={handleJoin}>Join Team!</button>}
                    <div className="team_bar">
                        {renderTeam(request[0].team_length)}
                    </div>
                </RequestInfo>
            )}
        </>
    );
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Request);

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
`;
