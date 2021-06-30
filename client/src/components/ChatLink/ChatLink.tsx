import { useState } from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import useStyles from './useStyles';

interface ChatLink {
  firstName: string;
  lastName: string;
  profileImg: string;
  recentMsg: {
    type: string;
    content: string;
  };
}

interface RecentMsg {
  type: string;
  content: string;
}

const ChatLink = ({ firstName, lastName, profileImg, recentMsg }: ChatLink): JSX.Element => {
  const classes = useStyles();

  const fullName = () => {
    if (lastName === '(n/a)') {
      return firstName;
    } else {
      return `${firstName} ${lastName}`;
    }
  };

  const displayMsg = (recentMsg: RecentMsg) => {
    if (recentMsg.type === 'msg') {
      if (recentMsg.content.length > 23) {
        return `${recentMsg.content.slice(0, 20)}...`;
      } else {
        return recentMsg.content;
      }
    } else {
      return 'Sent photo';
    }
  };

  // const displayMsg = (recentMsg: string) => {
  //   return recentMsg;
  // };

  return (
    <Grid className={classes.userContainer}>
      <Grid className={classes.userPicStatus}>
        <Avatar className={classes.userPic} src={profileImg} alt="userPic" />
      </Grid>
      <Grid className={classes.userNameMsg}>
        <Typography className={classes.userName}> {fullName()} </Typography>
        <Typography className={`${classes.highlightUnreadMsg} ${classes.userMsg}`}>{displayMsg(recentMsg)}</Typography>
      </Grid>
    </Grid>
  );
};

export default ChatLink;
