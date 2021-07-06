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
    switch (type) {
      case 'message':
        return <MessageIcon />;
      case 'bookingRequested':
        return <LiveHelpIcon />;
      case 'bookingConfirmed':
        return <DoneOutlineIcon />;
      case 'bookingCancelled':
        return <CancelIcon />;
      case 'reminder':
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
