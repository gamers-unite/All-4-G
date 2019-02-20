import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import styled from "styled-components";
import socketIOClient from 'socket.io-client';
// Component Imports
import TeamMember from './TeamMember'
// Material UI Imports
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import AccountCircle from "@material-ui/icons/AccountCircle";

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

const styles = theme => ({
    card: {
        maxWidth: 1000,
        maxHeight: 400,
        margin: '5px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: blueGrey[900],
    },
    mini_avatar: {
        height: 35,
        width: 35,
    },
    player: {
        height: 29,
        width: 29
    }
});

const TestCard = props => {
    const [expanded, setExpand] = useState(false)
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

    const handleExpandClick = () => {
        setExpand(!expanded)
    };
    const { classes } = props;

    useEffect(() => { fillRequest() }, [props.user || update]);
    useEffect(() => { getUserStatus() }, [request || props.user]);
    useEffect(() => {
        socket.on('Player Joined', data => {
            if (props.id === data.room) {
                fillRequest()
                console.log('Join data: ', data)
            }
        });
        socket.on('Player Left', data => {
            if (props.id === data.room) {
                fillRequest()
                console.log('Left data: ', data)
            }
        });
        socket.on("Kicked Player", () => {
            fillRequest();
        })
    }, [])

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

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

    const myDate = (date) => {
        let arr = date.split('')
        let index = arr.indexOf('T')
        arr.splice(index)
        let splicedDate = arr.join('')
        let mo = splicedDate[5] + splicedDate[6]
        let day = splicedDate[8] + splicedDate[9]
        let year = arr.splice(0, 4).join('')
        let ans = `${month[+mo - 1]} ${day}, ${year} `
        return ans
    }

    return (
        <>
            {request[0] && (<Card className={classes.card} style={{ background: 'rgb(55, 71, 79)' }} >
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" src={props.creatorImg} className={classes.avatar} />
                    }
                    action={props.user.id && !creator && member ?
                        <Button variant='contained' style={{ height: '2.5em', width: '10em', fontSize: '.5em' }} onClick={leaveTeam}>Leave Team</Button>
                        : props.user.id && !creator && !member ?
                            <Button variant='contained' style={{ height: '2.5em', width: '10em', fontSize: '.5em' }} onClick={handleJoin}>Join Team!</Button>
                            : null
                    }
                    title={props.creatorName}
                    subheader={myDate(request[0].Date)}
                />
                <CardContent style={{ width: '1000px' }}>
                    <Typography component="p" style={{ width: '93%', textAlign: 'center' }}>
                        {request[0].info}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing style={{}}>
                    <Team className="team_bar">
                        <div>
                            {renderTeam(request[0].team_length, request)}
                        </div>
                    </Team>
                    {props.user.id && creator && <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>}
                </CardActions>
                {props.user.id && creator && <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {props.user.id && creator && <Button variant='contained' style={{ height: '5em', width: '7em' }} onClick={deleteTeam}>Cancel Team</Button>}
                        {props.user.id && creator && roomFull && <Button variant='contained' style={{ height: '5em', width: '7em' }} onClick={acceptTeam}>Accept Team</Button>}
                    </CardContent>
                </Collapse>}
            </Card>)}
        </>
    );
}

TestCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(withStyles(styles)(TestCard));

const Team = styled.div`
display: flex;
justify-content: center;
width: 100%;

div {
    display: flex;
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
`