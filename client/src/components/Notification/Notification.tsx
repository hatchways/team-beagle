import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './useStyles';
import moment from 'moment';

interface Notification {
  title: string;
  content: string;
  date: Date;
}

export default function Notification({ title, content, date }: Notification): JSX.Element {
  const classes = useStyles();

  const notificationDate = (date: Date) => {
    return moment(date).fromNow()
  };

  return (
    <ListItem>
      {console.log(date)}
      <ListItemText primary={title} secondary={content.length > 40 ? `${notificationDate(date)} - ${content.slice(0, 37)}...` : content} />
    </ListItem>
  );
}
