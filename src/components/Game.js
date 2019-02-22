import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
// Material UI Imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 300,
    maxHeight: 500,
    margin: 15,
    cursor: 'pointer'
  },
  media: {
    height: 300,
  },
};

const Game = props => {
  const [redirect, setRedirect] = useState(false)
  const { classes } = props;

  // takes you to top of selected game page
  const handleRedirect = () => {
    setRedirect(true)
    return window.scrollTo(0, 0);
  }

  if (redirect) {
    return <Redirect to={`/${props.url}`} />
  }

  return (
    <Card className={classes.card} onClick={handleRedirect} style={{ boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.65)' }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.logo}
        />
        <CardContent style={{ height: '300px', background: 'rgb(230, 230, 230)' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography component="p">
            {props.info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Game));