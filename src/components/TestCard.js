import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
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
import { connect } from 'react-redux';
import styled from "styled-components";
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from "axios";
import socketIOClient from 'socket.io-client';

const socket = socketIOClient();

export const renderTeam = (num, request) => {
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

const styles = theme => ({
  card: {
    maxWidth: 1000,
    maxHeight: 400,
    margin: '5px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

  const fillRequest = async () => {
      const req_id = props.id
      let result = await axios.post("/api/requests/id", { req_id });
      updateRequest(result.data)
      console.log(result.data)
      setUpdate(false)
      socket.emit('Enter Room', {room: req_id})
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

  const handleExpandClick = () => {
    setExpand(!expanded)
  };
  const { classes } = props;

  useEffect(() => { fillRequest() }, [props.user || update]);
  useEffect(() => { getUserStatus() }, [request || props.user]);
  useEffect(() => {
      socket.on('Player Joined', data =>  {
          if( props.id === data.room ) {
              // setUpdate(true)
              fillRequest()
              console.log('Join data: ', data)
          }
      });
      socket.on('Player Left', data =>  {
          if( props.id === data.room ) {
              // setUpdate(true)
              fillRequest()
              console.log('Left data: ', data)
          } 
      });
  }, [])

  const handleJoin = () => {
    axios.post("/api/teams", { req_id: props.id, user_id: props.user.id }).then(() => {
        fillRequest();
        setMember(true)
    })
    socket.emit('Joined', { room: props.id } )
}

  const leaveTeam = () => {
      axios.delete('/api/teams/user/', { data: { user_id: props.user.id, req_id: props.id } }).then(() => {
          fillRequest();
          setMember(false)
      })
      socket.emit('Leave', { room: props.id } )
  }

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    
  const myDate = (date) => {
    let arr = date.split('')
    let index = arr.indexOf('T')
    arr.splice(index)
    let splicedDate = arr.join('')
    let mo = splicedDate[5] + splicedDate[6]
    let day = splicedDate[8] + splicedDate[9]
    let year = arr.splice(0,4).join('')
    let ans = `${month[+mo - 1]} ${day}, ${year} `
    return ans
  }

  return (
    <>
      {request[0] && (<Card className={classes.card} style={{background: 'rgb(55, 71, 79)'}} >
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" src={props.creatorImg} className={classes.avatar}/>
          }
          action={ props.user.id && !creator && member ?
            <Button variant='contained' style={{ height: '2.5em', width: '10em', fontSize: '.5em' }} onClick={leaveTeam}>Leave Team</Button> 
            : props.user.id && !creator && !member ? 
            <Button variant='contained' style={{ height: '2.5em', width: '10em', fontSize: '.5em' }} onClick={handleJoin}>Join Team!</Button>
            : null
          }
          title={props.creatorName}
          subheader={myDate(request[0].Date)}
        />
        <CardContent style={{width: '1000px'}}>
          <Typography component="p" style={{ width: '93%', textAlign: 'center'}}>
            {request[0].info}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing style={{}}>
          <Team className="team_bar">
            <div>
              {renderTeam(request[0].team_length, request)}
            </div>
          </Team>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
              </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
              </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
          </CardContent>
        </Collapse>
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