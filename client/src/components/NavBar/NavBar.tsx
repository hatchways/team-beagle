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
import { Link as RouterLink } from 'react-router-dom';

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
import Notification from '../Notification/Notification';
import List from '@material-ui/core/List';

const NavBar = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser, logout, userProfile } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState<Element | null>(null);
  const [unreadNotifications, setUnreadNotifications] = React.useState<any[]>([]);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleNotificationsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setNotificationsAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };
  const handleLogOut = () => {
    handleMenuClose();
    logout();
  };

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      const data = await getUnreadNotifications()();
      setUnreadNotifications(data.notifications);
    };
    fetchUnreadNotifications();
  }, []);

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
          <Grid container alignItems="center" direction="row" className={classes.toolbarLeftContainer}>
            {!loggedInUser && (
              <AppBar position="relative" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
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
                </Toolbar>
              </AppBar>
            )}
            {loggedInUser && (
              <Grid item xs={10} sm={6} md={4} className={classes.toolbarLeft}>
                <Link component={RouterLink} variant="button" to="/dashboard" className={classes.link}>
                  Dashboard
                </Link>
                <Link component={RouterLink} variant="button" to="/sitters" className={classes.link}>
                  Bookings
                </Link>
                <Badge
                  color="secondary"
                  badgeContent={0}
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
                    {/* {unreadNotifications.length > 0 ? (
                      unreadNotifications.map((notification) => (
                        <Notification key={notification._id} title={notification.title} content={notification.content} />
                      ))
                    ) : (
                      <MenuItem>You have no unread notifications</MenuItem>
                    )} */}
                  </List>
                </Popover>
                <Badge color="primary" variant="dot">
                  <Link
                    component={RouterLink}
                    variant="button"
                    color="textPrimary"
                    to="/messages"
                    className={classes.messages}
                  >
                    Messages
                  </Link>
                </Badge>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                  <Avatar
                    alt={userProfile ? userProfile.firstName : ''}
                    src={userProfile ? userProfile.images[0] : ''}
                    className={classes.avatarLink}
                  />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={RouterLink} onClick={handleMenuClose} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
export default NavBar;
