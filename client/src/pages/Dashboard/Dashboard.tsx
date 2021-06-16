import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import { useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PetsIcon from '@material-ui/icons/Pets';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import Badge from '@material-ui/core/Badge';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Box from '@material-ui/core/Box';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser, logout } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  //temp
  const cards = [1, 2, 3, 4, 5, 6];
  const loggedIn = true;

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
    // setAnchorEl(e.currentTarget);
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
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      {/* <Grid item className={classes.drawerWrapper}>
        <ChatSideBanner loggedInUser={loggedInUser} />
      </Grid> */}
      <AppBar position="relative" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
              <PetsIcon color="primary" className={classes.toolbarIcon} />
              <Box display={{ xs: 'none', md: 'block' }}>LovingSitter.</Box>
            </Typography>
          </Link>
          <Grid container alignItems="center" direction="row" className={classes.toolbarLeftContainer}>
            {!loggedIn && (
              <Grid container xs={12} sm={6} md={4} direction="row" alignItems="center" className={classes.toolbarLeft}>
                <Link variant="button" underline="always" color="textPrimary" href="#" className={classes.link}>
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
            {loggedIn && (
              <Grid container xs={12} sm={6} md={4} direction="row" alignItems="center" className={classes.toolbarLeft}>
                <Link variant="button" href="#" className={classes.link}>
                  My Sitters
                </Link>

                <Badge color="primary" variant="dot" className={classes.link}>
                  <Link variant="button" color="textPrimary" href="#" className={classes.messages}>
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
      {/* End AppBar */}

      <Grid container>
        <Container className={classes.paper} maxWidth="md">
          <Typography className={classes.heading} variant="h4">
            Your search results
          </Typography>
          <Grid>
            <TextField
              id="outlined-basic"
              defaultValue="Toronto"
              variant="outlined"
              className={`${classes.textField} ${classes.textFieldLocation}`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="date"
              type="date"
              defaultValue="2017-05-24"
              variant="outlined"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Container>
        {/* End search */}

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Paper className={classes.card} elevation={3}>
                  <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className={classes.cardAvatar} />
                  <Typography variant="h6" component="h2" className={classes.cardName}>
                    Norma Byers
                  </Typography>
                  <Typography gutterBottom variant="subtitle2" component="p">
                    loving pet sitter
                  </Typography>
                  <Rating
                    value={2}
                    size="small"
                    readOnly
                    style={{
                      marginTop: '.4rem',
                      marginBottom: '.4rem',
                    }}
                  />

                  <Typography gutterBottom variant="button" component="p" className={classes.cardDescription}>
                    Dog sitting ,cat sitting, pocket pet and bird care
                  </Typography>

                  <Divider
                    style={{
                      width: '100%',
                    }}
                  />
                  <Grid container direction="row" justify="space-between" className={classes.cardFooter}>
                    <Grid
                      container
                      style={{
                        width: 'auto',
                      }}
                      direction="row"
                    >
                      <RoomIcon color="primary" />
                      <Typography className={classes.cardFooterLocation} variant="subtitle2" component="p">
                        Toronto
                      </Typography>
                    </Grid>

                    <Typography className={classes.cardFooterHr}>$14/hr</Typography>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* End cards */}
      </Grid>
    </Grid>
  );
}
