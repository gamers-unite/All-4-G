import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from "axios";

const Request = props => {
    const [request, updateRequest] = useState([]);
    const [creator, setCreator] = useState(false);
    const [member, setMember] = useState(false);
    const [fullRoom, setFullRoom] = useState(false);

    const fillRequest = async () => {
        const req_id = props.id
        let result = await axios.post("/api/requests/id", { req_id });
        updateRequest(result.data);
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

    useEffect(() => { fillRequest() }, [props.user]);
    useEffect(() => { getUserStatus() }, [request || props.user]);

    const handleJoin = () => {
        axios.post("/api/teams", { req_id: props.id, user_id: props.user.id }).then(() => {
            fillRequest();
            setMember(true)
        })
    }

    const leaveTeam = () => {
        axios.delete('/api/teams/user/', { data: { user_id: props.user.id, req_id: props.id } }).then(() => {
            fillRequest();
            setMember(false)
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


    return (
        <>
            {request[0] && (
                <RequestInfo>
                    <div>
                        <img src={props.creatorImg} alt="creator avatar" />
                        {props.creatorName}
                    </div>
                    <div>
                        <p>{request[0].info}</p>
                    </div>
                    {props.user.id && !creator && !member && <button onClick={handleJoin}>Join Team!</button>}
                    {props.user.id && !creator && member && <button onClick={leaveTeam}>Leave Team</button>}
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
