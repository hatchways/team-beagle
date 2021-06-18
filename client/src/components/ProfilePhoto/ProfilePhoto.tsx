import { useState } from 'react';
import { Grid, Typography, Avatar, Button, Icon, InputBase } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

function InputButton(): JSX.Element {
  const classes = useStyles();

  return (
    <Button className={classes.uploadButton} variant="outlined" color="secondary" component="label">
      Upload a file from your device
      <input type="file" hidden />
    </Button>
  );
}

export default function ProfilePhoto(): JSX.Element {
  const classes = useStyles();


  const [profilePhoto, setProfilePhoto] = useState('/assets/img/sample-profile.jpg');

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <Typography className={classes.settingsHeading}>Profile Photo</Typography>
      <Avatar alt="sampleImage" src={profilePhoto} className={classes.large} />
      <Typography className={classes.settingsSubheading}>
        Be sure to use a photo that clearly shows your face.
      </Typography>
      <InputBase classes={{ input: classes.inputBase }} name="profilePhoto" inputComponent={InputButton} type="file" />
      <Button>
        <Icon component={DeleteForeverIcon} />
        <Typography className={classes.deletePhotoText}>Delete Photo</Typography>
      </Button>
    </Grid>
  );

}
