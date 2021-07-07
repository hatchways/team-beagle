import { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import BookingRequest from '../../components/BookingRequest/BookingRequest';
import SelectedProfileCard from '../../components/SelectedProfileCard/SelectedProfileCard';
import { getSitterProfile } from '../../helpers/APICalls/getProfile';

import useStyles from './useStyles';

export default function ProfileDetails(profile: any): JSX.Element {
  const classes = useStyles();
  const [userProfile, setUserProfile] = useState({});


  useEffect(() => {
    getSitterProfile(profile.match.params.userId).then((res: any) => {
      setUserProfile(res.profile);
    });
  }, [profile.match.params]);

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid sm={12} md={8} className={classes.profileArea}>
        <Paper elevation={2} className={classes.profileCard}>
          <SelectedProfileCard profile={userProfile} />
        </Paper>
      </Grid>
      <Grid xs={12} md={4} className={classes.bookingArea}>
        <Paper elevation={2} className={classes.card}>
          <BookingRequest profile={userProfile} />
        </Paper>
      </Grid>
    </Grid>
  );
}
