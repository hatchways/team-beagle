import { ListItem, ListItemText, InputAdornment } from '@material-ui/core/';
import useStyles from './useStyles';
import moment from 'moment';
import MessageIcon from '@material-ui/icons/Message';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import NotificationsIcon from '@material-ui/icons/Notifications';

interface Notification {
  title: string;
  content: string;
  date: Date;
  type: string;
}

export default function Notification({ title, content, date, type }: Notification): JSX.Element {
  const classes = useStyles();

  const notificationDate = (date: Date) => {
    return moment(date).fromNow();
  };

  const getIcon = (type: string) => {
    if (type === 'message') {
      return <MessageIcon />;
    } else if (type === 'bookingRequested') {
      return <LiveHelpIcon />;
    } else if (type === 'bookingConfirmed') {
      return <DoneOutlineIcon />;
    } else if (type === 'bookingCancelled') {
      return <CancelIcon />;
    } else if (type === 'reminder') {
      return <NotificationsIcon />;
    }
  };

  return (
    <ListItem>
      {getIcon(type)}
      <ListItemText
        className={classes.root}
        primary={title}
        secondary={content.length > 40 ? `${notificationDate(date)} - ${content.slice(0, 30)}...` : content}
      />
    </ListItem>
  );
}
