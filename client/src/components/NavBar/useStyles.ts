import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 85,
  },

  appBar: {
    backgroundColor: '#FFFFFF',
  },
  toolbar: {
    margin: `auto 0`,
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: 34,
  },

  toolbarTitle: {
    fontWeight: 'bolder',
    display: 'flex',
    alignItems: 'center',
  },
  toolbarLink: {
    color: '#000000',
    fontWeight: 800,
    fontSize: 12,
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    marginRight: 24,
  },
  secondaryLink: {
    color: '#000',
    fontWeight: 800,
    textDecoration: 'none',
    marginLeft: '8px',
  },
  toolbarIcon: {
    fontSize: '2.8rem',
    color: theme.palette.primary.main,
    margin: '0.5rem',
  },
  toolbarLeftContainer: {
    width: 'auto',
    flexGrow: 1,
    marginRight: '40px',
  },
  toolbarLeft: {
    display: 'flex',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    maxWidth: 400,
    flexGrow: 1,
  },
  link: {
    fontWeight: 'bolder',
    // margin: theme.spacing(10, 20),
    fontSize: 18,
    marginLeft: '10px',
    marginRight: '20px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  avatarLink: {
    fontWeight: 'bolder',
    // margin: theme.spacing(10, 20),
    width: '60px',
    height: '60px',
    marginLeft: '25px',
    marginRight: '25px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    // margin: theme.spacing(2.5, 0.5),
    padding: theme.spacing(1.4, 5),
    fontSize: '.7rem',
    fontWeight: 500,
  },

  messages: {
    fontWeight: 'bolder',
    margin: theme.spacing(-0.8, 1.1),
    fontSize: 18,
  },
  logo: {
    width: 225,
    marginLeft: 24,
  },
  menuIcon: {
    marginTop: 10,
    marginRight: 20,
    height: 40,
    width: 'auto',
  },
  notificationsLink: {
    textAlign: 'center',
  },
  viewNotifications: {
    cursor: 'pointer',
  },
}));

export default useStyles;
