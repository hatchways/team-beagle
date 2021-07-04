import { useContext, useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, InputAdornment, Button, Tabs, Link } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Message from '../../components/Message/Message';
import ChatLink from '../../components/ChatLink/ChatLink';
import { AuthContext } from '../../context/useAuthContext';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import getConversations from '../../helpers/APICalls/getConversations';
import getConversationDetails from '../../helpers/APICalls/getConversationDetails';
import { Conversation } from '../../interface/Conversation';
import { IMessage } from '../../interface/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function Messages(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser, userProfile } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState('');
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>({
    participants: [],
    participantProfiles: [],
    messages: [],
    mostRecentMsg: {
      _id: '',
      sender: '',
      recipient: '',
      type: '',
      read: false,
      content: '',
      createdAt: new Date(),
    },
    deleted: false,
    pinned: false,
    unreadMsgs: 0,
    _id: '',
  });

  useEffect(() => {
    window.scroll({
      top: document.body.offsetHeight,
      behavior: 'smooth',
    });
    const fetchConversations = async () => {
      const data = await getConversations()();
      if (data !== undefined) {
        setAllConversations(data.conversations);
      }
    };
    fetchConversations();
  }, [loggedInUser]);

  const handleMsgSubmit = () => {
    console.log('submitting message');
  };

  const fetchConversationDetails = async (conversation: string, index: number) => {
    const data = await getConversationDetails(conversation)();
    if (data !== undefined) {
      const conversation = data.conversation;
      if (conversation !== undefined) {
        setSelectedConversation({
          ...conversation,
          participantProfiles: [conversation.participantProfiles[index]],
        });
      }
    }
  };

  const getMsgPic = (message: IMessage) => {
    if (userProfile !== null && userProfile !== undefined && loggedInUser !== null && loggedInUser !== undefined) {
      console.log(message.sender, loggedInUser);
      if (message.sender === loggedInUser.id) {
        return userProfile.images[0];
      } else {
        return selectedConversation.participantProfiles[0].images[0];
      }
    } else {
      return '';
    }
  };

  const getMsgDirection = (message: IMessage) => {
    if (userProfile !== null && userProfile !== undefined && loggedInUser !== null && loggedInUser !== undefined) {
      if (message.sender === loggedInUser.id) {
        return 'sent';
      } else {
        return 'received';
      }
    } else {
      return 'sent';
    }
  };

  const getMsgName = (message: IMessage) => {
    if (userProfile !== null && userProfile !== undefined && loggedInUser !== null && loggedInUser !== undefined) {
      if (message.sender === loggedInUser.id) {
        return userProfile.firstName;
      } else {
        return selectedConversation.participantProfiles[0].firstName;
      }
    } else {
      return '';
    }
  };

  const handleMsgInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Box component="main" className={classes.root}>
      <CssBaseline />
      <Grid className={classes.chatListContainer}>
        <Grid className={classes.currentUserContainer}>
          <Typography className={classes.conversationsHeading}>Conversations</Typography>
          <Grid className={classes.usersContainer}>
            {allConversations.map((conversation) => {
              const idx =
                loggedInUser !== null && loggedInUser !== undefined
                  ? conversation.participantProfiles[0].userId === loggedInUser.id
                    ? 1
                    : 0
                  : 0;
              return (
                <Grid
                  key={conversation._id}
                  onClick={() => fetchConversationDetails(conversation._id, idx)}
                  onMouseEnter={() => setShowOptions(conversation._id)}
                  onMouseLeave={() => setShowOptions('')}
                  className={`${classes.chatLink} ${
                    selectedConversation._id === conversation._id ? classes.selectedConversation : ''
                  }`}
                >
                  {showOptions === conversation._id && (
                    <Button onClick={() => console.log(conversation._id)}>
                      <MoreVertIcon className={classes.optionsBtn} />
                    </Button>
                  )}

                  <ChatLink
                    key={conversation._id}
                    firstName={conversation.participantProfiles[idx].firstName}
                    lastName={conversation.participantProfiles[idx].lastName}
                    profileImg={conversation.participantProfiles[idx].images[0]}
                    mostRecentMsg={conversation.mostRecentMsg}
                    unreadMsgs={conversation.unreadMsgs}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.currentChatContainer}>
        <Grid className={classes.currentChatTitle}>
          {selectedConversation.participants.length !== 0 && (
            <Box className={classes.currentChatTitleBar}>
              <Typography className={classes.chatName}>
                {selectedConversation.participantProfiles[0].lastName !== '(n/a)'
                  ? `${selectedConversation.participantProfiles[0].firstName} ${selectedConversation.participantProfiles[0].lastName}`
                  : selectedConversation.participantProfiles[0].firstName}
              </Typography>
              <Typography className={classes.chatTagLine}>
                {selectedConversation.participantProfiles[0].tagLine.length < 40
                  ? selectedConversation.participantProfiles[0].tagLine
                  : `${selectedConversation.participantProfiles[0].tagLine.slice(0, 37)}...`}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid className={classes.chatMsgsContainer}>
          <Grid className={classes.chatMsgs}>
            {selectedConversation.messages.map((message) => (
              <Message
                key={message._id}
                type={message.type}
                sendDate={message.createdAt}
                content={message.content}
                senderPic={getMsgPic(message)}
                senderName={getMsgName(message)}
                direction={getMsgDirection(message)}
              />
            ))}
          </Grid>
        </Grid>
        <form onSubmit={() => handleMsgSubmit()}>
          {selectedConversation !== null && (
            <TextField
              className={classes.chatMsgInput}
              placeholder="Type something..."
              value={message}
              variant="outlined"
              onChange={(e) => handleMsgInput(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button>
                      <SendIcon />
                    </Button>
                    <Button>
                      <ImageIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </form>
      </Grid>
    </Box>
  );
}
