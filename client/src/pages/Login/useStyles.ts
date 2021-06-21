import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 'calc(100vh - 85px)',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 85px)',
    backgroundColor: '#F8F8F8',
  },
  link: {
     width: 170,
    height: 54,
    borderRadius: theme.shape.borderRadius,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#fff',
    color: '#f04826',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #f04826',
  },
  secondaryLink: {
    color: '#000',
    fontWeight: 800,
    textDecoration: 'none',
  },
  contentArea: {
    borderRadius: '5px',
    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    marginTop: 155,
  },
  welcome: {
    marginTop: 45,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
}));

export default useStyles;
