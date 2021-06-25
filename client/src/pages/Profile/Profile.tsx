import { useState } from 'react';
import { Grid, Container, Typography, Link } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import EditProfile from '../../components/EditProfile/EditProfile';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';
import Payment from '../../components/Payment/Payment';
import Security from '../../components/Security/Security';
import Settings from '../../components/Settings/Settings';

export default function Profile(props: any): JSX.Element {
  const MENU_LIST = ['Edit Profile', 'Profile Photo', 'Payment', 'Security', 'Settings'];

  const classes = useStyles();

  const [currentSection, setCurrentSection] = useState(props.match.params.menuitem);

  const handleClick = (section: string) => {
    setCurrentSection(section);
    props.history.push(`/profile/${section}`);
  };

  return (
    <Grid container className={`${classes.root}`}>
      <CssBaseline />
      <Grid className={`${classes.menuItems}`}>
        {MENU_LIST.map((item) => (
          <Link
            onClick={() => handleClick(item.replace(/\s/g, '').toLowerCase())}
            className={`${classes.menuItem} ${currentSection === item.replace(/\s/g, '') && classes.selectedMenuItem}`}
            underline="none"
            key={item}
          >
            {item}
          </Link>
        ))}
      </Grid>
      <Container maxWidth="sm" className={classes.menuContainer}>
        {currentSection === 'editprofile' && <EditProfile />}
        {currentSection === 'profilephoto' && <ProfilePhoto />}
        {currentSection === 'payment' && <Payment />}
        {currentSection === 'security' && <Security />}
        {currentSection === 'settings' && <Settings />}
      </Container>
    </Grid>
  );
}
