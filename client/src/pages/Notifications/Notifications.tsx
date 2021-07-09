import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { Typography, AppBar, Tabs, Tab, Box, Grid, Container, Divider } from '@material-ui/core';
import useStyles from './useStyles';
import { useTheme } from '@material-ui/core/styles';
import NotificationsTabStyle from './NotificationsTabStyles';
import getUnreadNotifications from '../../helpers/APICalls/getUnreadNotifications';
import getAllNotifications from '../../helpers/APICalls/getAllNotifications';
import Notification from '../../components/Notification/Notification';
import { INotification } from '../../interface/Notification';
import { patchNotificationAsRead } from '../../helpers/APICalls/markNotificationAsRead';
import { useSocket } from '../../context/useSocketContext';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs(): JSX.Element {
  const classes = NotificationsTabStyle();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.tabBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
        >
          <Tab label="All" {...a11yProps(1)} />
          <Tab label="Unread" {...a11yProps(0)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <Notifications apiCall="getAllNotifications"></Notifications>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Notifications apiCall="getUnreadNotifications"></Notifications>
      </TabPanel>
    </div>
  );
}

const Notifications = ({ apiCall }: any): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { socket } = useSocket();

  const [notifications, setNotifications] = useState<INotification[]>([]);

  const markAsRead = async (id: string) => {
    const selectedNotification = notifications.filter((notification) => notification._id === id)[0];
    if (selectedNotification.read === false && apiCall === 'getUnreadNotifications') {
      patchNotificationAsRead(id);
      setNotifications(notifications.filter((notification) => notification._id !== id));
      if (socket !== undefined) {
        socket.emit('clearNotification', {
          type: 'readNotification',
          sender: loggedInUser?.id,
          recipient: loggedInUser?.id,
        });
      }
    }
  };

  useEffect(() => {
    const fetchRequest = apiCall === 'getUnreadNotifications' ? getUnreadNotifications : getAllNotifications;
    const fetchNotifications = async () => {
      const data = await fetchRequest()();
      console.log(data);
      if (data.notifications) {
        setNotifications(
          data.notifications.sort(
            (a: INotification, b: INotification) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
          ),
        );
      }
    };
    fetchNotifications();
  }, [loggedInUser, apiCall]);

  return (
    <Container className={classes.root}>
      {notifications.length > 0
        ? notifications.map((notification) => (
            <Grid key={notification._id} onClick={() => markAsRead(notification._id)}>
              <Notification
                key={notification._id}
                title={notification.title}
                content={notification.content}
                date={notification.createdAt}
                type={notification.type}
                read={notification.read}
                id={notification._id}
              />
              <Divider />
            </Grid>
          ))
        : `You have no notifications`}
    </Container>
  );
};
