import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyle';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default function BookingCard(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />

      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.cardDate}>
            5 April 2020, 10-12 AM
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className={classes.cardAvatar} />
            <Typography variant="h6">Norma Byers</Typography>

            <Typography variant="body2" className={classes.cardStatus}>
              ACCEPTED
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
