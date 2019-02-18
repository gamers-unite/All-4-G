import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from "axios";
import Button from '@material-ui/core/Button';


const Request = props => {
    const [request, updateRequest] = useState([]);

    const fillRequest = async () => {
        let result = await axios.post("/api/requests/id", { req_id: props.id });
        updateRequest(result.data);
    };

    useEffect(() => { fillRequest(); }, []);

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


    return (
        <div>
            {request[0] && (
                <RequestInfo>
                    <Creator>
                        <img src={props.creatorImg} alt="creator avatar" />
                        {props.creatorName}
                    </Creator>
                    <div>
                        <p>{request[0].info}</p>
                    </div>
                    { props.user.id && <Button variant='contained' style={{height: '5em', width: '7em'}} onClick={handleJoin}>Join Team!</Button>}
                    <div className="team_bar">
                        {renderTeam(request[0].team_length)}
                    </div>
                </RequestInfo>
            )}
        </div>
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
