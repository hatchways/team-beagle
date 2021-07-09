import { useContext, useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography, TextField, InputAdornment, Button, FormHelperText, InputBase } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Message from '../../components/Message/Message';
import ChatLink from '../../components/ChatLink/ChatLink';
import { AuthContext } from '../../context/useAuthContext';
import ImageIcon from '@material-ui/icons/Image';
import SendIcon from '@material-ui/icons/Send';
import getConversations from '../../helpers/APICalls/getConversations';
import getConversationDetails from '../../helpers/APICalls/getConversationDetails';
import sendMessage from '../../helpers/APICalls/sendMessage';
import { Conversation } from '../../interface/Conversation';
import { IMessage } from '../../interface/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSocket } from '../../context/useSocketContext';
import sendImage from '../../helpers/APICalls/sendImage';

export default function Messages(): JSX.Element {
  const classes = useStyles();
  const { socket } = useSocket();

  const { loggedInUser, userProfile } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState('');
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
        setAllConversations(
          data.conversations.sort(
            (a: Conversation, b: Conversation) =>
              new Date(b.mostRecentMsg.createdAt).valueOf() - new Date(a.mostRecentMsg.createdAt).valueOf(),
          ),
        );
      }
    };
    fetchConversations();
  }, [loggedInUser, selectedConversation]);

  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (endRef !== null) {
      endRef.current !== null ? endRef.current.scrollIntoView({ behavior: 'auto' }) : '';
    }
  }, [selectedConversation]);

  socket !== undefined
    ? socket.once('message', ({ from, to }) => {
        const fetchConversations = async () => {
          const data = await getConversations()();
          if (data !== undefined) {
            setAllConversations(data.conversations);
          }
        };
        if (loggedInUser !== undefined && loggedInUser !== null) {
          if (to === loggedInUser.id) {
            fetchConversations();
            const currentConversation = allConversations.filter(
              (conversation) => conversation._id === selectedConversation._id,
            );
            if (selectedConversation.participants.length !== 0 && loggedInUser !== null && loggedInUser !== undefined) {
              const idx = currentConversation[0].participantProfiles[0].userId === loggedInUser.id ? 1 : 0;
              fetchConversationDetails(selectedConversation._id, idx);
            }
          } else if (from === loggedInUser.id) {
            fetchConversations();
          }
        }
      })
    : '';

  const handleMsgSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    recipient: string,
    type: string,
    content: string,
  ) => {
    e.preventDefault();
    if (content.length === 0) {
      setErrorMsg('You cannot send an empty message');
    } else if (content.length > 150) {
      setErrorMsg('You cannot send a message that is more than 150 characters ');
    } else {
      const data = await sendMessage(recipient, type, content)();
      setMessage(() => '');
      if (socket !== undefined) {
        socket.emit('message', {
          content: message,
          sender: loggedInUser?.id,
          recipient,
        });
        socket.emit('notification', {
          type: 'message',
          sender: loggedInUser?.id,
          recipient,
        });
      }
      if (data !== undefined) {
        setSelectedConversation({
          ...selectedConversation,
          messages: [...selectedConversation.messages, data.message],
        });
      }
    }
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

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  const validateAndUploadFile = (e: HTMLInputEvent | React.ChangeEvent<HTMLInputElement>) => {
    console.log('uploading file...');
    if (e.target.files) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
      const file = e.target.files[0];
      if (validTypes.indexOf(file.type) === -1) {
        console.error('Invalid file type. Uplaod a jpg or png file.');
      } else if (file.size > 2000000) {
        console.error('File size is too large. The maximum size is 2MB');
      } else {
        const addPhoto = async () => {
          const data = await sendImage('messageImage', file, selectedConversation.participantProfiles[0].userId)();
          if (data.message) {
            if (socket !== undefined) {
              socket.emit('message', {
                content: message,
                sender: loggedInUser?.id,
                recipient: selectedConversation.participantProfiles[0].userId,
              });
              socket.emit('notification', {
                type: 'message',
                sender: loggedInUser?.id,
                recipient: selectedConversation.participantProfiles[0].userId,
              });
            }
            if (data !== undefined) {
              setSelectedConversation({
                ...selectedConversation,
                messages: [...selectedConversation.messages, data.message],
              });
            }
          }
        };
        addPhoto();
      }
    }
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
                  <Button onClick={() => console.log(conversation._id)}>
                    <MoreVertIcon className={classes.optionsBtn} />
                  </Button>

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
          {selectedConversation.participantProfiles.length !== 0 && (
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
            {selectedConversation.messages.map((message) => {
              return (
                <Message
                  key={message._id}
                  type={message.type}
                  sendDate={message.createdAt}
                  content={message.content}
                  senderPic={getMsgPic(message)}
                  senderName={getMsgName(message)}
                  direction={getMsgDirection(message)}
                />
              );
            })}
            <Grid ref={endRef}></Grid>
          </Grid>
        </Grid>
        <FormHelperText>{errorMsg}</FormHelperText>
        <form onSubmit={(e) => handleMsgSubmit(e, selectedConversation.participantProfiles[0].userId, 'msg', message)}>
          {selectedConversation.participants.length !== 0 && (
            <TextField
              className={classes.chatMsgInput}
              placeholder="Type something..."
              value={message}
              variant="outlined"
              onChange={(e) => handleMsgInput(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="submit">
                      <SendIcon />
                    </Button>
                    <Button component="label">
                      <ImageIcon />
                      <input type="file" hidden onChange={(e) => validateAndUploadFile(e)} />
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
