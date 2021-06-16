import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
  },

  dashboard: { backgroundColor: '#FFFFFF' },

  appBar: {
    backgroundColor: '#FFFFFF',
  },
  toolbar: {
    height: 85,
    flexWrap: 'wrap',
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
  },
  link: {
    fontWeight: 'bolder',
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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bolder',
    marginBottom: theme.spacing(5),
  },
  textField: {
    fontWeight: 'bolder',
    margin: theme.spacing(0.5, 0),
    '& .MuiInputBase-input': {
      backgroundColor: 'white',
      fontWeight: 'bolder',
    },
  },
  textFieldLocation: {
    color: 'red',
    '& .MuiOutlinedInput-notchedOutline ': {
      marginRight: -2,
    },
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },

  cardAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  cardName: {
    fontWeight: 'bolder',
  },
  cardDescription: {
    paddingBottom: theme.spacing(3),
  },
  cardFooter: {
    fontSize: '.8rem',
    padding: theme.spacing(2, 3),
  },
  cardFooterLocation: {
    marginLeft: theme.spacing(1),
    opacity: 0.6,
  },
  cardFooterHr: {
    fontWeight: 'bolder',
  },
}));

export default useStyles;
