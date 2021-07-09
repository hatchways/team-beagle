import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: '10px',
  },
  unread: {
    backgroundColor: '#bbb',
  },
  notificationsContainer: {
    '&:hover': {
      pointer: 'cursor',
    },
  },
}));

export default useStyles;
