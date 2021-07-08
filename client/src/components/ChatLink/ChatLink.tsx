import { Grid, Typography, Avatar, Badge, Button } from '@material-ui/core';
import useStyles from './useStyles';

interface ChatLink {
  firstName: string;
  lastName: string;
  profileImg: string;
  mostRecentMsg: {
    type: string;
    content: string;
  };
  unreadMsgs: number;
  key: string;
}

interface mostRecentMsg {
  type: string;
  content: string;
}

const ChatLink = ({ firstName, lastName, profileImg, mostRecentMsg, unreadMsgs }: ChatLink): JSX.Element => {
  const classes = useStyles();

  const fullName = () => {
    if (lastName === '(n/a)') {
      return firstName;
    } else {
      return `${firstName} ${lastName}`;
    }
  };

  return (
    <Grid className={classes.userContainer}>
      <Grid className={classes.userPicStatus}>
        <Badge badgeContent={unreadMsgs} color="primary">
          <Avatar className={classes.userPic} src={profileImg} alt="userPic" />
        </Badge>
      </Grid>

      <Grid className={classes.userNameMsg}>
        <Typography className={classes.userName}> {fullName()} </Typography>
        <Typography noWrap className={`${unreadMsgs !== 0 ? classes.highlightUnreadMsg : ''} ${classes.userMsg}`}>
          {mostRecentMsg.content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ChatLink;
