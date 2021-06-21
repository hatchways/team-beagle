import { useState } from 'react';
import { Grid, Typography, Avatar, Button, Icon, InputBase } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Carousel from 'react-material-ui-carousel';
import uploadPhoto from '../../helpers/APICalls/uploadPhoto'

function InputButton(): JSX.Element {
  const classes = useStyles();

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  const validateAndUploadFile = (e: HTMLInputEvent | React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
      const file = e.target.files[0]
      if (validTypes.indexOf(file.type) === -1) {
        console.error('Invalid file type. Uplaod a jpg or png file.')
      } else if (file.size > 2000000) {
        console.error('File size is too large. The maximum size is 2MB')
      } else {
        uploadPhoto('profilePhoto', file)
      }
    }
  };

  return (
    <Button className={classes.uploadButton} variant="outlined" color="secondary" component="label">
      Upload a file from your device
      <input type="file" hidden onChange={(e) => validateAndUploadFile(e)} />
    </Button>
  );
}

export default function ProfilePhoto(): JSX.Element {
  const classes = useStyles();

  const [photos, setPhotos] = useState(['photo1', 'photo2', 'photo3', 'photo4', 'photo5']);
  const [mainProfilePhoto, setMainProfilePhoto] = useState(photos[0]);
  const [fileSelected, setFileSelected] = useState<File>();

  const updateMainPhoto = (photo: string) => {
    setMainProfilePhoto(photo);
  };

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <Typography className={classes.settingsHeading}>Profile Photo</Typography>
      <Carousel autoPlay={false}>
        {photos.map((item, i) => (
          <Grid key={i} className={classes.photoContainer}>
            <Avatar alt="sampleImage" src={item} className={classes.large} />
            {mainProfilePhoto === item ? (
              <Typography>This is your main photo</Typography>
            ) : (
              <Button className={classes.photoBtn} variant="contained" onClick={() => updateMainPhoto(item)}>
                Set as my main photo
              </Button>
            )}
          </Grid>
        ))}
      </Carousel>
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
