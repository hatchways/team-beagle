import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: 'auto',
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    border: '1px solid rgba(0,0,0,0.3)',
    borderRadius: '5px',
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    color: '#f04826',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#f04826',
    fontWeight: 'bold',
  },
  signUpText: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    
  },
  secondaryLink: {
    marginLeft: '8px',
    color: '#000',
    fontWeight: 900,
    textDecoration: 'none',
  }
}));

export default useStyles;