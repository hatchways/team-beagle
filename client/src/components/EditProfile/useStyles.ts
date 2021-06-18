import { makeStyles } from '@material-ui/core/styles';
import { CenterFocusStrong } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {},
  settingsHeading: {
    fontSize: '1.4rem',
    margin: '50px 0',
    fontWeight: 800,
    textAlign: 'center',
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
  },
}));

export default useStyles;
