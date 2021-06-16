import { useState } from "react"
import { Grid, Container, Typography, Link } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
import EditProfile from '../../components/EditProfile/EditProfile'
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto'
import Payment from '../../components/Payment/Payment'
import Security from '../../components/Security/Security'
import Settings from '../../components/Settings/Settings'


export default function Profile(): JSX.Element {
  const classes = useStyles();

  const [currentSection, setCurrentSection] = useState("EditProfile")

  const handleClick = (section: string) => {
    setCurrentSection(section)
  }

  return (
    <Grid container className={`${classes.root}`}>
      <CssBaseline />
      {/* <ChatSideBanner /> */}
      <Grid className={`${classes.menuItems}`}>
        <Link 
          onClick={() => handleClick("EditProfile")} 
          className={`${classes.menuItem} ${currentSection === "EditProfile" && classes.selectedMenuItem}`} 
          underline="none"
        > 
          Edit Profile 
        </Link>
        <Link 
          onClick={() => handleClick("ProfilePhoto")} 
          className={`${classes.menuItem} ${currentSection === "ProfilePhoto" && classes.selectedMenuItem}`} 
          underline="none"
        > 
          Profile Photo 
        </Link>
        <Link 
          onClick={() => handleClick("Availability")} 
          className={`${classes.menuItem} ${currentSection === "Availability" && classes.selectedMenuItem}`} 
          underline="none"
        > 
          Availability 
        </Link>
        <Link 
          onClick={() => handleClick("Payment")} 
          className={`${classes.menuItem} ${currentSection === "Payment" && classes.selectedMenuItem}`} 
          underline="none"
        > 
          Payment 
        </Link>
        <Link 
          onClick={() => handleClick("Security")} 
          className={`${classes.menuItem} ${currentSection === "Security" && classes.selectedMenuItem}`} 
          underline="none"
        > 
          Security 
        </Link>
        <Link 
          onClick={() => handleClick("Settings")} 
          className={`${classes.menuItem} ${currentSection === "Settings" && classes.selectedMenuItem}`} 
          underline="none"
        > 
          Settings 
        </Link>
      </Grid>
      <Container maxWidth="sm" >
        {currentSection === "EditProfile" && <EditProfile />}
        {currentSection === "ProfilePhoto" && <ProfilePhoto />}
        {currentSection === "Payment" && <Payment />}
        {currentSection === "Security" && <Security />}
        {currentSection === "Settings" && <Settings />}
      </Container>
    </Grid>
  );
}
