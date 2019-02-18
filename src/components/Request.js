import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from "axios";
import Button from '@material-ui/core/Button';


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
        <Background>
            {request[0] && (
                <RequestInfo>
                    <Creator>
                        <img src={props.creatorImg} alt="creator avatar" />
                        {props.creatorName}
                    </Creator>
                    <div>
                        <p>{request[0].info}</p>
                    </div>
                    {props.user.id && !creator && !member && <Button variant='contained' style={{height: '5em', width: '7em'}} onClick={handleJoin}>Join Team!</Button>}
                    {props.user.id && !creator && member && <Button variant='contained' style={{height: '5em', width: '7em'}}onClick={leaveTeam}>Leave Team</Button>}
                    <div className="team_bar">
                        {renderTeam(request[0].team_length)}
                    </div>
                </RequestInfo>
            )}
        </Background>
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

// const Background = styled.div`
//     background-image: url("https://firebasestorage.googleapis.com/v0/b/all-4-g.appspot.com/o/images%2Fbackground.jpg?alt=media&token=88fde558-e096-4a32-9b76-c7bb9eeb3b3c");
//     background-position: center;
//     background-repeat: no-repeat;
//     background-size: cover;
// `
