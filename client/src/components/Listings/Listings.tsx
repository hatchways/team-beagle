import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';

//Api calls
import React, { useState, useEffect, useCallback, useContext } from 'react';
import searchSitters from '../../helpers/APICalls/searchSitters';
import searchSittersByDays from '../../helpers/APICalls/searchSittersByDays';
import getProfiles from '../../helpers/APICalls/getProfiles';

//Interface
import { User } from '../../interface/User';
import { Profile } from '../../interface/Profile';
import ProfileCard from '../ProfileCard/ProfileCard';
import Tour from 'reactour';
import { AuthContext } from '../../context/useAuthContext';

import moment from 'moment';

export interface ProfileProps {
  firstName: string;
  lastName: string;
  description: string;
  location: string;
  images: [string];
  userId: string;
  hourlyRate: string;
}

interface DateProps {
  startDate: Date;
  endDate: Date;
}

export default function Listings(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const date = new Date();
  const [sitters, setSitters] = useState<Profile[]>([]);
  const [searchCityUsers, setSearchCityUsers] = useState<Profile[]>([]);
  const [searchDayUsers, setSearchDayUsers] = useState<Profile[]>([]);
  const [searchProfiles, setSearchProfiles] = useState<string>('');
  const [dates, setDates] = useState<string>('');
  const [isTourOpen, setIsTourOpen] = useState(true);
  const [showMoreUsers, setShowMoreUsers] = useState(false);

  const profilesOnLoad = () => {
    const profileList: Profile[] = [];
    getProfiles().then((data) => {
      const profile: any = data.profiles;
      if (profile) {
        profile.map((user: Profile) => {
          if (profile) {
            profileList.push(user);
          }
        });
        setSitters(profileList);
      }
    });
  };

  const updateProfilesByCity = useCallback(async () => {
    const profileDaysList: Profile[] = [];
    const profileCityList: Profile[] = [];
    const idList = new Set();
    const profile: Profile[] = [];
    if (dates && searchProfiles) {
      const dataDays = await searchSittersByDays(dates);
      const dataCity = await searchSitters(searchProfiles);
      const daysProfiles: any = dataDays.profiles;
      console.log(daysProfiles);
      const cityProfiles: any = dataCity.profiles;
      console.log(cityProfiles);
      if (daysProfiles) {
        daysProfiles.forEach((user: any) => {
          profileDaysList.push(user);
          idList.add(user.userId);
        });
      }
      if (cityProfiles) {
        cityProfiles.forEach((user: any) => {
          profileCityList.push(user);
          if (idList.has(user.userId)) {
            profile.push(user);
          }
        });
      }

      console.log(profile);
      setSitters(profile);
    } else if (searchProfiles) {
      const searchList: Profile[] = [];
      const data = await searchSitters(searchProfiles);
      const profile: any = data.profiles;
      if (profile) {
        profile.map((user: Profile) => {
          if (profile) {
            searchList.push(user);
          }
        });
        setSitters(searchList);
      }
    } else {
      profilesOnLoad();
    }
  }, [searchProfiles, dates]);

  const updateProfilesByDate = useCallback(async () => {
    const profileDaysList: Profile[] = [];
    const profileCityList: Profile[] = [];
    const idList = new Set();
    const profile: Profile[] = [];
    if (dates && searchProfiles) {
      const dataDays = await searchSittersByDays(dates);
      const dataCity = await searchSitters(searchProfiles);
      const daysProfiles: any = dataDays.profiles;
      console.log(daysProfiles);
      const cityProfiles: any = dataCity.profiles;
      console.log(cityProfiles);
      if (daysProfiles) {
        daysProfiles.forEach((user: any) => {
          profileDaysList.push(user);
          idList.add(user.userId);
        });
      }
      if (cityProfiles) {
        cityProfiles.forEach((user: any) => {
          profileCityList.push(user);
          if (idList.has(user.userId)) {
            profile.push(user);
          }
        });
      }

      console.log(profile);
      setSitters(profile);
    } else if (dates) {
      const profileList: Profile[] = [];
      const data = await searchSittersByDays(dates);
      const profile: any = data.profiles;
      if (profile) {
        profile.map((user: any) => {
          profileList.push(user);
        });
      } else {
        profilesOnLoad();
      }
      setSearchDayUsers(profileList);
    }
  }, [dates, searchProfiles]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchProfiles(e.target.value);
  };

  const handleDateChange = (e: any) => {
    const now = moment(e.target.value).format('dddd').toLocaleLowerCase();
    setDates(now);
  };

  const handleShowMore = () => {
    setShowMoreUsers(true);
  };

  const handleShowLess = () => {
    setShowMoreUsers(false);
  };

  useEffect(() => {
    updateProfilesByCity();
  }, [setSearchCityUsers, updateProfilesByCity]);

  useEffect(() => {
    updateProfilesByDate();
  }, [updateProfilesByDate, setSearchDayUsers]);

  useEffect(() => {
    profilesOnLoad();
  }, []);

  const finishTour = () => {
    setIsTourOpen(false);
    if (loggedInUser !== null && loggedInUser !== undefined) {
      setLoggedInUser({
        id: loggedInUser?.id,
        email: loggedInUser?.email,
        username: loggedInUser?.username,
        newUser: false,
      });
    }
  };

  const steps = [
    {
      selector: '.fourth-step',
      content: 'You can search for dogsitters based on their location here',
    },
    {
      selector: '.fifth-step',
      content: "Here you can search based on the sitters' available schedule",
    },
    {
      selector: '.sixth-step',
      content: 'Here you will find a list of dogsitters based on your search results',
    },
    {
      content: 'You can also go back to your profile to add images and payment information. Good luck!',
    },
  ];

  return (
    <Grid container component="main" direction="column" className={`${classes.root} ${classes.listings}`}>
      <CssBaseline />
      {loggedInUser?.newUser === true && <Tour steps={steps} isOpen={isTourOpen} onRequestClose={() => finishTour()} />}
      <Container className={classes.paper} maxWidth="md">
        <Typography className={classes.heading} variant="h4">
          Your search results
        </Typography>
        <Grid>
          <TextField
            id="outlined-basic"
            label="Find Sitters In Your Location"
            variant="outlined"
            className={`${classes.textField} ${classes.textFieldLocation} fourth-step`}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={`${classes.textField} ${classes.textFieldLocation}fifth-step`}
            label="Drop Off"
            id="outlined-basic"
            variant="outlined"
            type="date"
            defaultValue={new Date()}
            InputLabelProps={{
              shrink: true,
            }}
            name="startDate"
            onChange={handleDateChange}
          />
        </Grid>
      </Container>
      {/* End search */}

      {sitters &&
        sitters?.length > 0 &&
        (!showMoreUsers ? (
          <Container className={`${classes.cardGrid} sixth-step`} maxWidth="md">
            <Grid container spacing={4}>
              {sitters.slice(0, 6).map((profile) => (
                <Grid item key={profile.userId} xs={12} sm={6} md={4}>
                  <ProfileCard profile={profile} />
                </Grid>
              ))}
            </Grid>
            <Button onClick={handleShowMore} variant="outlined" className={classes.showMore}>
              Show More Options
            </Button>
          </Container>
        ) : (
          <Container className={`${classes.cardGrid} sixth-step`} maxWidth="md">
            <Grid container spacing={4}>
              {sitters.slice(0, 12).map((profile) => (
                <Grid item key={profile.userId} xs={12} sm={6} md={4}>
                  <ProfileCard profile={profile} />
                </Grid>
              ))}
            </Grid>
            <Button onClick={handleShowLess} variant="outlined" className={classes.showMore}>
              Show Fewer Options
            </Button>
          </Container>
        ))}

      {sitters && sitters?.length === 0 && (
        <Container className={`${classes.cardGrid} sixth-step`} maxWidth="md">
          <Grid container justify="center">
            <Typography>No Sitters Found</Typography>
          </Grid>
        </Container>
      )}
    </Grid>
  );
}
