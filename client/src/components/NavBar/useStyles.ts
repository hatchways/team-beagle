import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
    height: 85,
  },

  appBar: {
    backgroundColor: '#FFFFFF',
  },
  toolbar: {
    flexWrap: 'wrap',
    margin: `auto 0`,
  },

  toolbarTitle: {
    fontWeight: 'bolder',
    display: 'flex',
    alignItems: 'center',
  },
  toolbarIcon: {
    marginRight: theme.spacing(2),
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  toolbarLeftContainer: {
    width: 'auto',
    flexGrow: 1,
  },
  toolbarLeft: {
    display: 'flex',
    marginLeft: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 400,
    flexGrow: 1,
  },
  link: {
    fontWeight: 'bolder',
    margin: theme.spacing(0, 0.5),
  },
  button: {
    margin: theme.spacing(2.5, 0.5),
    padding: theme.spacing(1.4, 5),
    fontSize: '.7rem',
    fontWeight: 500,
  },

  messages: {
    fontWeight: 'bolder',
    margin: theme.spacing(-0.8, 1.1),
  },
}));

export default useStyles;
