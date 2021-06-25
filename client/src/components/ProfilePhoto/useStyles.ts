import { makeStyles } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsHeading: {
    fontSize: '1.4rem',
    margin: '50px 0',
    fontWeight: 800,
  },
  settingsSubheading: {
    fontSize: '1.2rem',
    color: '#8D8D8D',
    width: '60%',
    marginTop: '30px',
    fontWeight: 600,
    textAlign: 'center',
  },
  large: {
    height: '200px',
    width: '200px',
  },
  inputBase: {
    border: '2px solid red',
  },
  uploadButton: {
    padding: '10px 40px',
    margin: '15px 0',
    fontSize: '1.1rem',
  },
  deletePhotoText: {
    fontWeight: 600,
    color: '#8D8D8D',
    marginLeft: '10px',
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBtn: {
    margin: '10px 0'
  },
  mainPhotoMsg: {
    fontSize: '1.1rem',
  },
}));

export default useStyles;
