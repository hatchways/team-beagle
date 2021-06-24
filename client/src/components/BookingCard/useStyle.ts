import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignContent: 'start',
    margin: theme.spacing(1, 0),
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(0.8),
  },
  cardDate: {
    marginBottom: theme.spacing(1.8),
  },
  cardAvatar: {
    marginRight: theme.spacing(1.2),
  },
  cardName: {
    fontWeight: 'bolder',
  },
  cardStatus: {
    fontWeight: 'bolder',
    opacity: 0.4,
    marginLeft: 'auto',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
