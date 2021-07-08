import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import { NavLink as RouterLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import PetsIcon from '@material-ui/icons/Pets';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Box from '@material-ui/core/Box';
import MenuIcon from '@material-ui/icons/Menu';
import LoginHeader from '../LoginHeader/LoginHeader';
import SignupHeader from '../SignUpHeader/SignUpHeader';
import Popover from '@material-ui/core/Popover';
import getUnreadNotifications from '../../helpers/APICalls/getUnreadNotifications';
import { patchAllNotificationsAsRead, patchNotificationAsRead } from '../../helpers/APICalls/markNotificationAsRead';
import Notification from '../Notification/Notification';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { useSocket } from '../../context/useSocketContext';
import { INotification } from '../../interface/Notification';

const NavBar = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser, logout, userProfile } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState<Element | null>(null);
  const [unreadNotifications, setUnreadNotifications] = React.useState<INotification[]>([]);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleNotificationsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setNotificationsAnchorEl(e.currentTarget);
  };

  const history = useHistory();

  const handleViewNotifications = () => {
    handleMenuClose();
    history.push('/notifications');
  };

  const markAllNotificationsAsRead = async () => {
    console.log('marking all notifications as read');
    const data = await patchAllNotificationsAsRead();
    if (data.notifications) {
      fetchUnreadNotifications();
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };
  const handleLogOut = () => {
    handleMenuClose();
    logout();
  };

  const fetchUnreadNotifications = async () => {
    const data = await getUnreadNotifications()();
    if (data.notifications) {
      setUnreadNotifications(
        data.notifications.sort(
          (a: INotification, b: INotification) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        ),
      );
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, [loggedInUser]);

  const { socket } = useSocket();
  socket !== undefined
    ? socket.once('notification', ({ from, to, type }) => {
        if (loggedInUser !== undefined && loggedInUser !== null) {
          if (to === loggedInUser.id) {
            fetchUnreadNotifications();
          }
        }
      })
    : '';

  return (
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <Typography variant="h5" color="textPrimary" noWrap className={classes.toolbarTitle}>
              <PetsIcon color="primary" className={classes.toolbarIcon} />
              <Box display={{ xs: 'none', md: 'block' }}>LovingSitter.</Box>
            </Typography>
          </Link>
          {!loggedInUser && (
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <MenuIcon color="primary" className={classes.menuIcon} />
              </Hidden>
              <Hidden only={['xs']}>
                <Hidden only={['xs', 'sm']}>
                  <Typography className={classes.toolbarLink}>
                    <Link className={classes.secondaryLink} href="/sitters">
                      Become a Sitter
                    </Link>
                  </Typography>
                </Hidden>
                <LoginHeader linkTo="/login" btnText="Log In" />
                <SignupHeader linkTo="/signup" btnText="Sign Up" />
              </Hidden>
            </Grid>
          )}
          {loggedInUser && (
            <Grid item className={classes.toolbarLeft}>
              <Hidden only={['xs', 'sm']}>
                <Link
                  component={RouterLink}
                  variant="button"
                  color="textPrimary"
                  to="/dashboard"
                  activeClassName="selected"
                  className={classes.link}
                >
                  Dashboard
                </Link>
                <Link
                  component={RouterLink}
                  variant="button"
                  color="textPrimary"
                  to="/sitters"
                  activeClassName="selected"
                  className={classes.link}
                >
                  Bookings
                </Link>
                {unreadNotifications && (
                  <>
                    <Badge
                      color="secondary"
                      badgeContent={unreadNotifications.length}
                      max={99}
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <Link
                        aria-controls="notifications-menu"
                        aria-haspopup="true"
                        component={RouterLink}
                        variant="button"
                        to="#"
                        className={classes.link}
                        onClick={handleNotificationsClick}
                        color="textPrimary"
                      >
                        Notifications
                      </Link>
                    </Badge>
                    <Popover
                      id={'notifications-list'}
                      open={Boolean(notificationsAnchorEl)}
                      anchorEl={notificationsAnchorEl}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <List>
                        {unreadNotifications.length > 0 ? (
                          unreadNotifications.map((notification, idx) => (
                            <>
                              <Notification
                                key={notification._id}
                                title={notification.title}
                                content={notification.content}
                                date={notification.createdAt}
                                type={notification.type}
                              />
                              {idx === unreadNotifications.length - 1 ? (
                                <>
                                  <Link
                                    className={classes.viewNotifications}
                                    underline="none"
                                    onClick={() => markAllNotificationsAsRead()}
                                  >
                                    <Typography className={classes.notificationsLink}>
                                      Mark all notifications as read
                                    </Typography>
                                  </Link>
                                </>
                              ) : (
                                <Divider />
                              )}
                            </>
                          ))
                        ) : (
                          <MenuItem>You have no unread notifications</MenuItem>
                        )}
                      </List>
                      <Link
                        className={classes.viewNotifications}
                        underline="none"
                        onClick={() => handleViewNotifications()}
                      >
                        <Typography className={classes.notificationsLink}>View all notifications</Typography>
                      </Link>
                    </Popover>
                  </>
                )}

                <Badge color="primary" variant="dot" className={classes.link}>
                  <Link
                    component={RouterLink}
                    variant="button"
                    color="textPrimary"
                    to="/messages"
                    className={classes.messages}
                    activeClassName="selected"
                  >
                    Messages
                  </Link>
                </Badge>
              </Hidden>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                <Avatar
                  alt={userProfile ? userProfile.firstName : ''}
                  src={userProfile ? userProfile.images[0] : ''}
                  className={classes.avatarLink}
                />
              </Button>
              <Menu
                disableScrollLock={true}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem>
                  <Typography variant="h6" color="primary">
                    {userProfile ? `${userProfile.firstName} ${userProfile.lastName} ` : ''}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem component={RouterLink} onClick={handleMenuClose} to="/profile">
                  Profile
                </MenuItem>
                <Hidden mdUp>
                  <MenuItem>
                    <Link component={RouterLink} color="textPrimary" to="/dashboard" activeClassName="selected">
                      Dashboard
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <Link component={RouterLink} color="textPrimary" to="/sitters" activeClassName="selected">
                      Bookings
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <Link component={RouterLink} color="textPrimary" to="/messages" activeClassName="selected">
                      Messages
                    </Link>
                  </MenuItem>
                </Hidden>

                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
export default NavBar;
