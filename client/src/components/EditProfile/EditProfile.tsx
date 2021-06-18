import { useState } from 'react';
import { Grid, Typography, TextField, Button, Switch, InputAdornment, FormHelperText } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const [available, setAvailable] = useState(false);
  const [firstName, setFirstName] = useState({ valid: false, value: '' });
  const [lastName, setLastName] = useState({ valid: false, value: '' });
  const [email, setEmail] = useState({ valid: false, value: '' });
  const [address, setAddress] = useState({ valid: false, value: '' });
  const [selfDescription, setSelfDescription] = useState({ valid: false, value: '' });
  const [phoneNumbers, setPhoneNumbers] = useState({
    primary: { valid: false, value: '' },
    secondary: { valid: false, value: '' },
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSwitch = () => {
    setAvailable(!available);
  };

  const handleChange = (e: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) => {
    if (e.name === 'firstName') setFirstName({ ...firstName, value: e.value });
    if (e.name === 'lastName') setLastName({ ...lastName, value: e.value });
    if (e.name === 'email') setEmail({ ...email, value: e.value });
    if (e.name === 'primaryPhone')
      setPhoneNumbers({ ...phoneNumbers, primary: { ...phoneNumbers.primary, value: e.value.replace(/\D/g, '') } });
    if (e.name === 'secondaryPhone')
      setPhoneNumbers({ ...phoneNumbers, secondary: { ...phoneNumbers.secondary, value: e.value.replace(/\D/g, '') } });
    if (e.name === 'address') setAddress({ ...address, value: e.value });
    if (e.name === 'selfDescription') setSelfDescription({ ...selfDescription, value: e.value });
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    if (firstName.value.length > 1 && firstName.value.length <= 20) {
      setFirstName({ ...firstName, valid: true });
    } else setFirstName({ ...firstName, valid: false });

    if (lastName.value.length > 1 && lastName.value.length <= 20) {
      setLastName({ ...lastName, valid: true });
    } else setLastName({ ...lastName, valid: false });

    setEmail({ ...email, valid: validateEmail(email.value) });

    if (
      phoneNumbers.primary.value.length === 10 &&
      (phoneNumbers.secondary.value.length === 10 || phoneNumbers.secondary.value.length === 0)
    ) {
      setPhoneNumbers({
        primary: { ...phoneNumbers.primary, valid: true },
        secondary: { ...phoneNumbers.secondary, valid: true },
      });
    }

    if (address.value.length > 1 && address.value.length <= 40) {
      setAddress({ ...address, valid: true });
    } else setAddress({ ...address, valid: false });

    if (selfDescription.value.length > 1 && selfDescription.value.length <= 300) {
      setSelfDescription({ ...selfDescription, valid: true });
    } else setSelfDescription({ ...selfDescription, valid: false });

    if (
      firstName.valid &&
      lastName.valid &&
      email.valid &&
      phoneNumbers.primary.valid &&
      phoneNumbers.secondary.valid &&
      address.valid &&
      selfDescription.valid
    )
      return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    setSubmitted(true);
    if (validateForm() === true) updateProfile();
  };

  const updateProfile = () => {
    // TODO: make API call to update profile
    console.log('valid form');
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
            value={firstName.value}
            error={!firstName.valid && submitted === true}
            helperText={!firstName.valid && submitted === true && 'Please provide a first name'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {submitted === true && firstName.valid && <CheckCircleIcon />}
                  {submitted === true && firstName.valid === false && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 20 }}
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
            value={lastName.value}
            error={!lastName.valid && submitted === true}
            helperText={!lastName.valid && submitted === true && 'Please provide a last name'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {submitted === true && lastName.valid && <CheckCircleIcon />}
                  {submitted === true && lastName.valid === false && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 20 }}
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
            value={email.value}
            error={!email.valid && submitted === true}
            helperText={!email.valid && submitted === true && 'Please provide a valid email address'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {submitted === true && email.valid && <CheckCircleIcon />}
                  {submitted === true && email.valid === false && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>PHONE NUMBERS</Typography>
          <Grid className={classes.phoneContainer}>
            <TextField
              className={`${classes.formInput}`}
              size="small"
              name="primaryPhone"
              value={phoneNumbers.primary.value}
              onChange={(e) => handleChange(e.target)}
              variant="outlined"
              placeholder="Example: 1234567890"
              error={!phoneNumbers.primary.valid && submitted === true}
              label="Primary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {submitted === true && phoneNumbers.primary.valid && <CheckCircleIcon />}
                    {submitted === true && phoneNumbers.primary.valid === false && <ErrorIcon />}
                  </InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 10 }}
            />
            <TextField
              className={`${classes.formInput}`}
              size="small"
              name="secondaryPhone"
              variant="outlined"
              placeholder="Example: 1234567890"
              label="Secondary (optional)"
              error={!phoneNumbers.secondary.valid && submitted === true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {submitted === true && phoneNumbers.secondary.valid && <CheckCircleIcon />}
                    {submitted === true && phoneNumbers.secondary.valid === false && <ErrorIcon />}
                  </InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
        </Grid>
        <FormHelperText error={!phoneNumbers.primary.valid && submitted === true} className={classes.phoneHelperText}>
          Include the digits only with no spaces
        </FormHelperText>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>WHERE YOU LIVE</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="Address"
            onChange={(e) => handleChange(e.target)}
            name="address"
            value={address.value}
            error={!address.valid && submitted === true}
            helperText={!address.valid && submitted === true && 'Please provide your address'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {submitted === true && address.valid && <CheckCircleIcon />}
                  {submitted === true && address.valid === false && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 40 }}
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>DESCRIBE YOURSELF</Typography>
          <TextField
            className={`${classes.formInput} ${classes.formTextField}`}
            size="small"
            variant="outlined"
            placeholder="About you in 300 characters or less"
            type="string"
            multiline={true}
            rows={4}
            onChange={(e) => handleChange(e.target)}
            name="selfDescription"
            value={selfDescription.value}
            error={!selfDescription.valid && submitted === true}
            helperText={!selfDescription.valid && 'Please describe yourself in 300 characters or less'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {submitted === true && selfDescription.valid && <CheckCircleIcon />}
                  {submitted === true && selfDescription.valid === false && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 300 }}
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
