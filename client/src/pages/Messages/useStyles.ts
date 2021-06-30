import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
    margin: '0 60px',
    marginTop: '60px',
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '100vh',
  },
  chatListContainer: {
    marginLeft: '20px',
    marginTop: '30px',
    width: '350px',
  },
  currentUserContainer: {
    display: 'flex',
    justifyContent: 'flexStart',
    width: '300px',
    alignItems: 'center',
  },
  usersContainer: {
    overflowY: 'scroll',
    maxHeight: '90%',
  },
  currentChatContainer: {
    width: '100%',
    flexDirection: 'column',
    maxHeight: '80%',
  },
  currentChatTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '80px',
    boxShadow: '2px 2px 3px 4px rgba(0, 0, 0, 0.05)',
    maxHeight: '10%',
  },
  chatMsgs: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    height: '80vh',
  },
  chatMsgInput: {
    width: '80%',
    backgroundColor: '#eaeef8',
    maxHeight: '10%',
    marginBottom: '20px',
  },
}));

export default useStyles;
