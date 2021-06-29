import { useState } from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import useStyles from './useStyles';

interface ChatLink {
  firstName: string;
  lastName: string;
  profileImg: string;
  recentMsg: string;
}

const ChatLink = ({ firstName, lastName, profileImg, recentMsg }: ChatLink): JSX.Element => {
  const classes = useStyles();

  const fullName = () => {
    lastName !== '(n/a)' ? firstName : `${firstName} ${lastName}`;
  };

  const displayMsg = (recentMsg: string) => {
    if (recentMsg.type === 'msg') {
      return recentMsg.content;
    } else {
      return 'Sent photo';
    }
  };

  return (
    <Grid className={classes.userContainer}>
      <Grid className={classes.userPicStatus}>
        <Avatar className={classes.userPic} src={profileImg} alt="userPic" />
      </Grid>
      <Grid className={classes.userNameMsg}>
        <Typography className={classes.userName}> {fullName()} </Typography>
        <Typography className={`${classes.highlightUnreadMsg} ${classes.userMsg}`}>
          {() => displayMsg(recentMsg)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ChatLink;
