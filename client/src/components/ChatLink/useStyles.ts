import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  userContainer: {
    display: 'flex',
    justifyContent: 'flexStart',
    width: '300px',
    alignItems: 'center',
    margin: '30px 20px',
  },
  userPicStatus: {
    position: 'relative',
  },
  statusDot: {
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    zIndex: 3,
    position: 'absolute',
    left: '45px',
    top: '35px',
    border: '2px solid white',
  },
  statusAway: {
    backgroundColor: 'bbb',
  },
  statusAvailable: {
    backgroundColor: '#1CED84',
  },
  userPic: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  userNameMsg: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 10px',
    marginRight: '40px',
    width: '200px',
    cursor: 'default',
  },
  userName: {
    margin: '0 0',
    fontWeight: 600,
  },
  userMsg: {
    margin: '0 0',
    fontSize: '0.8rem',
  },
  unreadContainer: {
    position: 'relative',
  },
  highlightUnreadMsg: {
    fontWeight: 800,
    fontSize: '2rem',
  },
  hideUnreadMsgs: {
    visibility: 'hidden',
  },
  unreadMsgs: {
    position: 'absolute',
    top: '0px',
    left: '6px',
    fontSize: '0.8rem',
    color: '#FFFFFF',
  },
}));

export default useStyles;
