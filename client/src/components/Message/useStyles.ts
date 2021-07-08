import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  msgPic: {
    width: '250px',
    borderRadius: '10px',
  },
  receivedMsgPic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    alignItems: 'center',
    marginRight: '10px',
  },
  sentMsgPic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    alignItems: 'center',
    marginLeft: '10px',
  },
  receivedMsg: {
    display: 'flex',
    flexDirection: 'row',
    margin: '15px 0',
    marginLeft: '10px',
    alignItems: 'center',
  },
  receivedMsgHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  receivedMsgName: {
    fontWeight: 600,
  },
  sentMsg: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginTop: '15px',
    marginRight: '10px',
  },
  receivedMsgBubble: {
    borderRadius: '20px',
    borderTopLeftRadius: 0,
    backgroundColor: '#3A8DFF',
    color: '#FFFFFF',
    padding: '10px 10px',
    maxWidth: '300px',
  },
  sentMsgBubble: {
    borderRadius: '20px',
    borderTopRightRadius: 0,
    backgroundColor: '#bbb',
    color: '#FFFFFF',
    padding: '10px 10px',
    marginBottom: '15px',
    maxWidth: '300px',
  },
}));

export default useStyles;
