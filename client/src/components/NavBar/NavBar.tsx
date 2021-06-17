import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import PetsIcon from '@material-ui/icons/Pets';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Box from '@material-ui/core/Box';

const NavBar = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser, logout } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  //temp

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    handleMenuClose();
    logout();
  };
  const handleProfile = () => {
    handleMenuClose();
    history.push('/profile');
  };

  return (
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />
      <AppBar position="relative" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link component={RouterLink} to="/">
            <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
              <PetsIcon color="primary" className={classes.toolbarIcon} />
              <Box display={{ xs: 'none', md: 'block' }}>LovingSitter.</Box>
            </Typography>
          </Link>
          <Grid container alignItems="center" direction="row" className={classes.toolbarLeftContainer}>
            {!loggedInUser && (
              <Grid item className={classes.toolbarLeft}>
                <Link
                  component={RouterLink}
                  to="/"
                  variant="button"
                  underline="always"
                  color="textPrimary"
                  className={classes.link}
                >
                  BECOME A SITTER
                </Link>
                <Button href="#" color="primary" variant="outlined" className={classes.button}>
                  LOGIN
                </Button>
                <Button href="#" color="primary" variant="contained" disableElevation className={classes.button}>
                  SIGN UP
                </Button>
              </Grid>
            )}
            {loggedInUser && (
              <Grid item xs={10} sm={6} md={4} className={classes.toolbarLeft}>
                <Link component={RouterLink} variant="button" to="/sitters" className={classes.link}>
                  My Sitters
                </Link>

                <Badge color="primary" variant="dot" className={classes.link}>
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
                  <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className={classes.link} />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
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
