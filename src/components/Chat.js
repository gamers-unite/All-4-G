import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';

const socket = socketIOClient();

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const Chat = props => {

  const [chat, setChat] = useState([])
  const [inputs, setInputs] = useState({
    multiline: ''
  })

  const setUp = async () => {
    const result = await axios.post("/api/chat", { req_id: props.id })
    console.log(result.data)
    setChat(result.data.reverse())
  }

  useEffect(() => {
    setUp()
    socket.emit('Enter Room', { room: props.id })
    socket.on('Received Chat', () => {
      setUp()
    })
  }, [])

  const keyPress = e => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  const handleChange = name => e => {
    setInputs({ ...inputs, [name]: e.target.value });
  };

  const handleClick = async () => {
    if (inputs.multiline !== '') {
      const obj = {
        text: inputs.multiline,
        user_id: props.user_id,
        req_id: props.id
      }
      await axios.post("api/chat/add", obj)
      socket.emit('Talking', { room: props.id })
      setInputs({ multiline: '' })
    }
  }

  const { classes } = props;

  const chatMap = chat.map((e, i) => {
    return (
      <div className='ind_chat'>
        <Avatar aria-label="Avatar" src={e.avatar} />
        <TextField
          id="outlined-multiline-flexible"
          multiline
          rowsMax="4"
          value={e.text}
          onChange={handleChange('multiline')}
          className='ind_input'
          margin="normal"
          variant="outlined"
        />
      </div>
    )
  })

  return (
    <ChatDiv>
      <div className='discussion'>
        {chatMap}
      </div>
      <div className='chat_field'>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Message"
          value={inputs.multiline}
          rowsMax="4"
          onChange={handleChange('multiline')}
          className='chat_input'
          margin="normal"
          variant="outlined"
          onKeyPress={keyPress}
        />
        <Fab color="secondary" aria-label="Add" className={classes.fab}>
          <AddIcon onClick={handleClick} />
        </Fab>
      </div>
    </ChatDiv>
  );
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);

const ChatDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  /* margin: 5%; */
  height: 100%;
  width: 700px;
  border: 1px solid black;
  border-radius: 25px;

/* ---- Messages Within the Chat Field ---- */
  .discussion {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    width: 90%;
    height: 78%;
    margin: 1% 0;
  }

  .ind_chat {
    display: flex;
    align-items: center;
  }

  .ind_input {
    margin-left: 2%;
    width: 80%;
  }

  .chat_field {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid black;
    padding: 3% 0;
    position: absolute;
    bottom: 0;
    width: 90%;
  }

  .chat_input {
    width: 80%;
    margin-bottom: 2%;
  }
`