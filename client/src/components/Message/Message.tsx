import { Typography, Grid, Avatar } from '@material-ui/core';
import useStyles from './useStyles';
import Image from 'material-ui-image';
import moment from 'moment';

interface ChatMessage {
  direction: string;
  senderName: string;
  senderPic: string;
  type: string;
  content: string;
  key: string;
  sendDate: Date;
}

const Message = ({ type, sendDate, content, senderName, senderPic, direction }: ChatMessage): JSX.Element => {
  const classes = useStyles();

  return direction === 'sent' ? (
    <Grid className={classes.sentMsg}>
      <Typography>{moment(sendDate).format('hh:mm A')}</Typography>
      {type === 'msg' ? (
        <Typography className={classes.sentMsgBubble}>{content}</Typography>
      ) : (
        <Image src={content} alt={content} />
      )}
    </Grid>
  ) : (
    <Grid className={classes.receivedMsg}>
      <Avatar className={classes.receivedMsgPic} src={senderPic} alt="senderPic" />
      <Grid>
        <Grid className={classes.receivedMsgHeading}>
          <Typography className={classes.receivedMsgName}>{senderName}</Typography>{' '}
          <Typography>{moment(sendDate).format('hh:mm A')}</Typography>
        </Grid>
        {type === 'msg' ? (
          <Typography className={classes.receivedMsgBubble}>{content}</Typography>
        ) : (
          <Image src={content} alt={content} />
        )}
      </Grid>
    </Grid>
  );
};

export default Message;
