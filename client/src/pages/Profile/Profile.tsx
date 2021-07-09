import { useState } from 'react';
import { Grid, Container, Typography, Link } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import EditProfile from '../../components/EditProfile/EditProfile';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';
import Payment from '../../components/Payment/Payment';
import Security from '../../components/Security/Security';
import Settings from '../../components/Settings/Settings';
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';
import { Box } from '@material-ui/core';

export default function Profile(props: any): JSX.Element {
  const MENU_LIST = ['Edit Profile', 'Profile Photo', 'Payment', 'Security', 'Settings'];

  const classes = useStyles();

  const [currentSection, setCurrentSection] = useState(props.match.params.menuitem);

  const handleClick = (section: string) => {
    setCurrentSection(section);
    handleClose();
    props.history.push(`/profile/${section}`);
  };

  const isNewUser = () => {
    if (props.location.state === undefined) {
      return false;
    } else {
      return props.location.state.newUser;
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container className={`${classes.root}`}>
      <CssBaseline />
      <Hidden only={['sm', 'md', 'lg', 'xl']}>
        <Box className={classes.buttonContainer}>
          <Button style={{ width: '100%' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}>
            <ExpandMoreIcon />
          </Button>

          <Menu
            id="simple-menu"
            disableScrollLock={true}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ width: '100%' }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            classes={{
              paper: classes.menuPaper,
              list: classes.menuList,
            }}
          >
            {MENU_LIST.map((item) => (
              <MenuItem key={item}>
                <Link
                  onClick={() => handleClick(item.replace(/\s/g, '').toLowerCase())}
                  className={`${classes.menuItem} ${
                    currentSection === item.replace(/\s/g, '').toLowerCase() && classes.selectedMenuItem
                  }`}
                  underline="none"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {item}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Hidden>
      <Hidden only={['xs']}>
        <Grid className={`${classes.menuItems}`}>
          {MENU_LIST.map((item) => (
            <Link
              onClick={() => handleClick(item.replace(/\s/g, '').toLowerCase())}
              className={`${classes.menuItem} ${
                currentSection === item.replace(/\s/g, '').toLowerCase() && classes.selectedMenuItem
              }`}
              underline="none"
              key={item}
            >
              {item}
            </Link>
          ))}
        </Grid>
      </Hidden>

      <Grid className={classes.menuContainer}>
        {currentSection === 'editprofile' && <EditProfile newUser={isNewUser()} />}
        {currentSection === 'profilephoto' && <ProfilePhoto newUser={isNewUser()} />}
        {currentSection === 'payment' && <Payment />}
        {currentSection === 'security' && <Security />}
        {currentSection === 'settings' && <Settings />}
      </Grid>
    </Grid>
  );
}
