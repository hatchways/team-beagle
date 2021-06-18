import { useState } from 'react';
import { Grid, Typography, TextField, Button, Switch } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <form>
        <Typography className={classes.settingsHeading}>Edit Profile</Typography>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>I&apos;M AVAILABLE</Typography>
          <Switch />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>AVAILABILITY</Typography>
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>FIRST NAME</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="John"
            type="string"
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>LAST NAME</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="Doe"
            type="string"
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>EMAIL ADDRESS</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="john-doe@gmail.com"
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>PHONE NUMBER</Typography>
          {phoneNumbers.length === 0 ? (
            <Grid className={classes.phoneContainer}>
              <Typography className={classes.phoneText}> No phone number entered </Typography>
              <Button className={classes.phoneButton} variant="outlined" color="secondary">
                Add a phone number
              </Button>
            </Grid>
          ) : (
            phoneNumbers
          )}
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>WHERE YOU LIVE</Typography>
          <TextField className={`${classes.formInput}`} size="small" variant="outlined" placeholder="Address" />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>DESCRIBE YOURSELF</Typography>
          <TextField
            className={`${classes.formInput} ${classes.formTextField}`}
            size="small"
            variant="outlined"
            placeholder="About you"
            type="string"
            multiline={true}
            rows={4}
          />
        </Grid>
      </form>
    </Grid>
  );
}
