import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#FAFAFB',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  profileArea: {
    width: '100%',
  },
  profileCard: {
    marginTop: '80px',
    paddingLeft: '170px',
    paddingRight: '130px',
    flex: 1,
    justifyContent: 'space-around',
    [theme.breakpoints.down('lg')]: {
      marginTop: '50px',
      paddingRight: '10px',
      paddingLeft: '10px',
    },
  },
  bookingArea: {
    flex: 1,
    marginTop: '80px',
    paddingRight: '170px',
    justifyContent: 'space-around',
    [theme.breakpoints.down('lg')]: {
      marginTop: '50px',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },
  card: {
    width: '100%',
  },
}));

export default useStyles;
