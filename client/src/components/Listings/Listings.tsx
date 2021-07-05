import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useEffect, useCallback } from 'react';
import searchSitters from '../../helpers/APICalls/searchSitters';
import getProfiles from '../../helpers/APICalls/getProfiles';
import { User } from '../../interface/User';
import { Profile } from '../../interface/Profile';
import ProfileCard from '../ProfileCard/ProfileCard';

export interface ProfileProps {
  firstName: string;
  lastName: string;
  description: string;
  location: string;
  images: [string];
  userId: string;
  hourlyRate: string;
}

export default function Listings(): JSX.Element {
  const classes = useStyles();

  const date = new Date();
  const [sitters, setSitters] = useState<Profile[]>([]);
  const [searchProfiles, setSearchProfiles] = useState<string>('');
  
  const profilesOnLoad = () => {
    const profileList: Profile[] = [];
    getProfiles().then((data) => {
    const profile: any = data.profiles;
    if (profile) {
      profile.map((user: Profile) => {
        if (profile) {
          profileList.push(user)
        }
      });
        setSitters(profileList);
    }
    })
  
    }

  const updateProfiles = useCallback(async () => {
    const searchList: Profile[] = [];
    const data = await searchSitters(searchProfiles);
    const profile: any = data.profiles;
    console.log(profile);
    if (profile) {
      profile.map((user: Profile) => {
        if (profile) {
          searchList.push(user);
        }
      });
      setSitters(searchList);
    }
  }, [searchProfiles]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchProfiles(e.target.value);
  };
  useEffect(() => {
    updateProfiles();
  }, [setSearchProfiles, updateProfiles]);

  useEffect(() => {
    profilesOnLoad();
  }, []);

  return (
    <Grid container component="main" direction="column" className={`${classes.root} ${classes.listings}`}>
      <CssBaseline />
      <Container className={classes.paper} maxWidth="md">
        <Typography className={classes.heading} variant="h4">
          Your search results
        </Typography>
        <Grid>
          <TextField
            id="outlined-basic"
            label="Find Sitters In Your Location"
            variant="outlined"
            className={`${classes.textField} ${classes.textFieldLocation}`}
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
            id="date"
            type="date"
            defaultValue={date}
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
          {sitters.slice(0,6).map((profile) => (
            <Grid item key={profile.userId} xs={12} sm={6} md={4}>
              <ProfileCard profile={profile} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};
