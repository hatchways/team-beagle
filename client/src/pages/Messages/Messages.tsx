import { useContext, useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, InputAdornment, Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Message from '../../components/Message/Message';
import ChatLink from '../../components/ChatLink/ChatLink';
import { AuthContext } from '../../context/useAuthContext';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SendIcon from '@material-ui/icons/Send';

export default function Messages(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('');

  useEffect(() => {
    window.scroll({
      top: document.body.offsetHeight,
      behavior: 'smooth',
    });
  }, []);

  const handleMsgSubmit = () => {
    console.log('sending message');
  };

  const handleMsgInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Box component="main" className={classes.root}>
      <CssBaseline />
      {/* <Typography className={classes.root}>MESSAGES</Typography> */}
      {/* <ChatLink
        firstName="johnny"
        lastName="johnson"
        profileImg=""
        recentMsg={{ type: 'msg', content: "yo what's up?" }}
      />
      <ChatLink
        firstName="johnny"
        lastName="johnson"
        profileImg=""
        recentMsg={{ type: 'msg', content: 'hello there' }}
      /> */}
      <Grid className={classes.chatListContainer}>
        <Grid className={classes.currentUserContainer}>
          <Typography>MESSAGES</Typography>
          <Grid className={classes.usersContainer}></Grid>
        </Grid>
      </Grid>
      <Grid className={classes.currentChatContainer}>
        <Grid className={classes.currentChatTitle}></Grid>
        <Grid className={classes.chatMsgs}></Grid>
        <form onSubmit={() => handleMsgSubmit()}>
          {selectedChat !== null && (
            <TextField
              className={classes.chatMsgInput}
              placeholder="Type something..."
              value={message}
              variant="outlined"
              onChange={(e) => handleMsgInput(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon />
                    <FileCopyIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </form>
      </Grid>
    </Box>
  );
}
