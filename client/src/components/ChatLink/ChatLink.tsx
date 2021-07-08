import { Grid, Typography, Avatar, Badge, Button } from '@material-ui/core';
import Message from '../../pages/Notifications/Notifications';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';

interface ChatLink {
  firstName: string;
  lastName: string;
  profileImg: string;
  mostRecentMsg: {
    type: string;
    content: string;
    sender: string;
  };
  unreadMsgs: number;
  key: string;
}

interface mostRecentMsg {
  type: string;
  content: string;
  sender: string;
}

const ChatLink = ({ firstName, lastName, profileImg, mostRecentMsg, unreadMsgs }: ChatLink): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  const fullName = () => {
    if (lastName === '(n/a)') {
      return firstName;
    } else {
      return `${firstName} ${lastName}`;
    }
  };

  const addYou = (message: mostRecentMsg) => {
    if (message.sender === loggedInUser?.id) {
      return 'You - ';
    } else {
      return '';
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
          {mostRecentMsg.type === 'msg'
            ? `${addYou(mostRecentMsg)}${mostRecentMsg.content}`
            : `${addYou(mostRecentMsg)}sent image`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ChatLink;
