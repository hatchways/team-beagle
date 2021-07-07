import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#FAFAFB',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'column',
    },
  },
  profileArea: {
    width: '100%',
  },
  profileCard: {
    marginTop: '80px',
    marginLeft: '170px',
    marginRight: '130px',
    flex: 1,
    justifyContent: 'space-around',
    [theme.breakpoints.down('lg')]: {
      marginTop: '50px',
      marginRight: '10px',
      marginLeft: '10px',
    },
  },
  bookingArea: {
    flex: 1,
    marginTop: '80px',
    marginRight: '170px',
    justifyContent: 'space-around',
    [theme.breakpoints.down('lg')]: {
      marginTop: '50px',
      marginLeft: '10px',
      marginRight: '10px',
    },
  },
  card: {
    width: '100%',
  },
}));

export default useStyles;
