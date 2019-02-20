import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from "axios";
import socketIOClient from 'socket.io-client';
import TeamMember from './TeamMember'

const socket = socketIOClient();

export const renderTeam = (num, request) => {
    let team = [];
    for (let i = 0; i < num; i++) {
        if (request[i]) {
            team.push(
                <TeamMember key={i}
                    request={request[i]}
                />
            );
        } else {
            team.push(<AccountCircle key={i} className="mini_avatar" />);
        }
    }
    return team;
};

const Request = props => {

    const [request, updateRequest] = useState([]);
    const [creator, setCreator] = useState(false);
    const [member, setMember] = useState(false);
    const [update, setUpdate] = useState(false);
    const [roomFull, setRoomFull] = useState(false)

    const fillRequest = async () => {
        const req_id = props.id
        let result = await axios.post("/api/requests/id", { req_id });
        updateRequest(result.data)
        if (result.data[0].team_length <= result.data.length) {
            setRoomFull(true)
        }
        setUpdate(false)
        socket.emit('Enter Room', { room: req_id })
    };

    const getUserStatus = async () => {
        if (request[0] && props.user.id) {
            if (request[0].creator_id === props.user.id) {
                setCreator(true);
            }
            const memberResult = await axios.post('/api/teams/user', { req_id: props.id })
            if (memberResult.data[0]) {
                setMember(true)
            }
        }
    }

    // FUNCTION FOR CREATOR TO ACCEPT TEAM AND ARCHIVES IT
    const acceptTeam = () => {
        const req_id = props.id
        axios.put("/api/requests/deactivate", { req_id }).then(() => props.fillGame())
    }

    // FUNCTION FOR CREATOR TO DELETE REQUEST, DELETE INSTANCES IN TEAM TABLE, AND RELOAD ALL REQUESTS
    const deleteTeam = async () => {
        const req_id = props.id
        await axios.delete("/api/teams", { data: { req_id } })
        await axios.delete("/api/requests", { data: { req_id } })
        props.fillGame();
    }

    useEffect(() => { fillRequest() }, [props.user || update]);
    useEffect(() => { getUserStatus() }, [request || props.user]);
    useEffect(() => {
        socket.on('Player Joined', data => {
            if (props.id === data.room) {
                // setUpdate(true)
                fillRequest()
                console.log('Join data: ', data)
            }
        });
        socket.on('Player Left', data => {
            if (props.id === data.room) {
                // setUpdate(true)
                fillRequest()
                console.log('Left data: ', data)
            }
        });
        socket.on('Kicked Player', data => {
            fillRequest();
        })
    }, [])

    // useEffect(() => { fillRequest() }, [update])

    const handleJoin = () => {
        axios.post("/api/teams", { req_id: props.id, user_id: props.user.id }).then(() => {
            fillRequest();
            setMember(true)
        })
        socket.emit('Joined', { room: props.id })
    }

    const leaveTeam = () => {
        axios.delete('/api/teams/user/', { data: { user_id: props.user.id, req_id: props.id } }).then(() => {
            fillRequest();
            setMember(false)
        })
        socket.emit('Leave', { room: props.id })
    }

    return (
        <>
            {request[0] && (
                <RequestInfo>
                    {/* <p>This is the timer value: {timer}</p> */}
                    <Creator>
                        <img src={props.creatorImg} alt="creator avatar" />
                        {props.creatorName}
                    </Creator>
                    <div>
                        <p>{request[0].info}</p>
                    </div>
                    {props.user.id && !creator && !member && !roomFull && <Button variant='contained' style={{ height: '5em', width: '7em' }} onClick={handleJoin}>Join Team!</Button>}
                    {props.user.id && !creator && member && <Button variant='contained' style={{ height: '5em', width: '7em' }} onClick={leaveTeam}>Leave Team</Button>}
                    {props.user.id && creator && <Button variant='contained' style={{ height: '5em', width: '7em' }} onClick={deleteTeam}>Cancel Team</Button>}
                    {props.user.id && creator && roomFull && <Button variant='contained' style={{ height: '5em', width: '7em' }} onClick={acceptTeam}>Accept Team</Button>}
                    <div className="team_bar">
                        {renderTeam(request[0].team_length, request)}
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
    align-items: center;
    border: 2em solid #333333;
    border: 1em solid #ffffff;
    border-radius: 20% 50%;
    margin: 5px 0;
    background: #333333;
    height: 8em;

    .team_bar {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding-top: 2em;
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

const Creator = styled.div`
    display: flex;
    justify-content: row;
    align-items: center;
    padding-bottom: 2em;
`
