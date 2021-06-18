import { useState } from 'react';
import { Grid, Typography, TextField, Button, Switch, InputAdornment } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const [available, setAvailable] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const handleSwitch = () => {
    setAvailable(!available);
  };

  const handleChange = (e: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) => {
    if (e.name === 'firstName') setFirstName(e.value);
    if (e.name === 'lastName') setLastName(e.value);
    if (e.name === 'email') setEmail(e.value);
    if (e.name === 'address') setAddress(e.value);
    if (e.name === 'selfDescription') setSelfDescription(e.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('profile updated');
  };

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography className={classes.settingsHeading}>Edit Profile</Typography>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>I&apos;M AVAILABLE</Typography>
          <Switch checked={available} onChange={handleSwitch} name="available" />
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
            onChange={(e) => handleChange(e.target)}
            name="firstName"
            value={firstName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CheckCircleIcon />
                </InputAdornment>
              ),
            }}
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
            onChange={(e) => handleChange(e.target)}
            name="lastName"
            value={lastName}
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>EMAIL ADDRESS</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="john-doe@gmail.com"
            onChange={(e) => handleChange(e.target)}
            name="email"
            value={email}
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
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="Address"
            onChange={(e) => handleChange(e.target)}
            name="address"
            value={address}
          />
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
            onChange={(e) => handleChange(e.target)}
            name="selfDescription"
            value={selfDescription}
          />
        </Grid>
        <Grid className={classes.submitBtn}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
