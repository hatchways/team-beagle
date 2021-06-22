import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 'calc(100vh - 85px)',
    boxSizing: 'border-box',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  appBar: {
     backgroundColor: 'rgba(0, 0, 0, 0)',
    
  },
    logo: {
    width: 225,
    marginLeft: 24,
  },
  toolbar: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  toolbarTitle: {
      marginLeft: 48, 
      width: 200,
     color: '#000000',
     fontWeight: 800,
     fontSize: 24,
     fontFamily: '"Open Sans", "sans-serif", "Roboto"',
  },
  toolbarLink: {
     color: '#000000',
     fontWeight: 800,
     fontSize: 12,
     fontFamily: '"Open Sans", "sans-serif", "Roboto"',
     marginRight: 24,
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
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
    marginLeft: '8px',
    cursor: 'pointer',
  },
  contentArea: {
    height: '100%',
    width: '100%',
    border: '1px solid black',
  },
  bannerArea: {
      height: '100%',
      width: '100%',
      border: '1px solid black',
  },
  banner: {
      width: '100%',
      height: '100vh',
  },
  welcome: {
    width: '80%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    fontSize: 64,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: 'Roboto',
    [theme.breakpoints.down("lg")]: {
        width: '90%',
      marginTop: '250px',
      marginBottom: '50px',
      fontSize: 56,
      alignItems: 'center',
      }
  },
  formArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: "55%",
    [theme.breakpoints.down("lg")]: {
      width: '100%',
      }
  },
    form: {
    margin: 'auto',
    marginTop: theme.spacing(1),
  },
    location: {
        width: '100%',
    },
    label: {
    fontSize: 19,
    color: 'rgb(0,0,0,1)',
    paddingLeft: '5px',
  },
  inputs: {
    border: '1px solid rgba(0,0,0,1)',
    borderRadius: '5px',
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  date: {
    marginTop: '12px',
  },
    submit: {
    margin: theme.spacing(3, 0, 3),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 29,
    fontSize: 12,
    backgroundColor: '#f04826',
    fontWeight: 'bold',
  },
}));

export default useStyles;
