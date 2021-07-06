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
  conversationsHeading: {
    fontSize: '1.2rem',
    margin: 'auto',
    fontWeight: 600,
  },
  chatListContainer: {
    marginLeft: '20px',
    marginTop: '50px',
    width: '300px',
  },
  currentUserContainer: {
    display: 'flex',
    justifyContent: 'flexStart',
    flexDirection: 'column',
    width: '300px',
    alignItems: 'center',
    overflow: 'hidden',
  },
  usersContainer: {
    overflowY: 'scroll',
    maxHeight: '90%',
    width: '300px',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
  },
  '@keyframes showOptions': {
    '0%': {
      transform: 'translateX(-80px)',
    },
    '100%': {
      transform: 'translateX(0px)',
    },
  },
  chatLink: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eaeef8',
      transform: 'translateX(0px)',
      animationName: '$showOptions',
      animationDuration: '100ms',
      animationTimingFunction: 'linear',
      visibility: 'visible',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    transform: 'translateX(-80px)',
    zIndex: -3,
    width: '500px',
  },
  selectedConversation: {
    backgroundColor: '#eaeef8',
    borderRadius: '5px',
  },
  optionsBtn: {
    margin: '0, 0',
    padding: '0, 0',
    width: '20px',
  },
  showOptionsBtn: {
    visibility: 'hidden',
  },
  currentChatContainer: {
    width: '100%',
    flexDirection: 'column',
    maxHeight: '80%',
  },
  currentChatTitle: {
    height: '80px',
    boxShadow: '2px 2px 3px 4px rgba(0, 0, 0, 0.05)',
    maxHeight: '10%',
  },
  currentChatTitleBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  chatName: {
    fontSize: '1.2rem',
    paddingLeft: '20px',
    fontWeight: 600,
  },
  chatTagLine: {
    paddingRight: '20px',
    fontStyle: 'italic',
  },
  chatMsgsContainer: {
    overflow: 'hidden',
  },
  chatMsgs: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    height: '80vh',
  },
  chatMsgInput: {
    width: '100%',
    backgroundColor: '#eaeef8',
    maxHeight: '10%',
    marginBottom: '20px',
    justifyContent: 'center',
  },
}));

export default useStyles;
