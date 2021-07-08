import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  newUserHeading: {
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  formItem: {
    display: 'flex',
    flexDirection: 'row',
    margin: '20px 0px',
    alignItems: 'center',
  },
  formLabel: {
    fontWeight: 800,
    width: '30%',
    textAlign: 'right',
  },
  formInput: {
    width: '70%',
    marginLeft: '20px',
  },
  formItemHidden: {
    display: 'none',
  },
  formTextField: {
    multiline: true,
    rows: 10,
  },
  phoneText: {
    fontStyle: 'italic',
    fontWeight: 600,
    marginLeft: '20px',
  },
  phoneButton: {
    fontWeight: 600,
    marginLeft: '15px',
  },
  phoneContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    paddingBottom: 0,
  },
  phoneHelperText: {
    marginLeft: '180px',
    padding: 0,
  },
  addressHelperText: {
    marginLeft: '180px',
    padding: 0,
  },
  submitBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: '15px 0',
  },
}));

export default useStyles;
