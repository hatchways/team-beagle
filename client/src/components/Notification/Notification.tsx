import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './useStyles';

interface Notification {
  title: string;
  content: string;
}

export default function Notification({ title, content }: Notification): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemText primary={title} secondary={content} />
    </ListItem>
  );
}
