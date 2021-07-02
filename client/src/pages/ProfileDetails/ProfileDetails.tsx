import { useState, useEffect, useContext } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import BookingRequest from '../../components/BookingRequest/BookingRequest';
import SelectedProfileCard from '../../components/SelectedProfileCard/SelectedProfileCard';
import {Profile} from "../../interface/Profile";
import { CurrentProfile } from '../../interface/AuthApiData'
import getProfile from '../../helpers/APICalls/getProfile';


import useStyles from './useStyles';


export default function ProfileDetails(profile: any): JSX.Element {
    const classes = useStyles();
    const [userProfile, setUserProfile] = useState({});

    console.log(profile.match.params)

    
   
    useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(profile.match.params)();
      console.log(data)
      setUserProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid sm={12} md={8} className={classes.profileArea}>
        <Paper elevation={2} className={classes.profileCard}>
          <SelectedProfileCard profile={profile}/>
        </Paper>
      </Grid>
      <Grid xs={12} md={4} className={classes.bookingArea}>
        <Paper elevation={2} className={classes.card}>
          <BookingRequest profile={profile} />
        </Paper>
      </Grid>
    </Grid>
  );
}

