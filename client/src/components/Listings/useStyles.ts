import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
  },

  listings: { backgroundColor: '#FFFFFF' },

  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
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
