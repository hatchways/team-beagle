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
    margin: '0.5rem'
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
  logo: {
    width: 225,
    marginLeft: 24,
  },
  menuIcon: {
    marginTop: 10,
    marginRight: 20,
    height: 40,
    width: 'auto',
  }
}));

export default useStyles;
