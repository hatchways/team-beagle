import { makeStyles } from '@material-ui/core/styles';

const NotificationsTabStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3.2),
  },
  tabBar: {
    marginTop: theme.spacing(8),
    maxWidth: 800,
    margin: 'auto',
  },
}));

export default NotificationsTabStyle;
