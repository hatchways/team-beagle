import { useState, useEffect, useContext } from 'react';
import { Grid, Typography, Avatar, Button, Icon, InputBase } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Carousel from 'react-material-ui-carousel';
import uploadPhoto from '../../helpers/APICalls/uploadPhoto';
import changeMainPhoto from '../../helpers/APICalls/changeMainPhoto';
import getProfile from '../../helpers/APICalls/getProfile';
import deletePhoto from '../../helpers/APICalls/deletePhoto';
import { AuthContext } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useHistory } from 'react-router-dom';

function InputButton({ ...props }): JSX.Element {
  const classes = useStyles();

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  const { updateSnackBarMessage } = useSnackBar();

  const validateAndUploadFile = (e: HTMLInputEvent | React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
      const file = e.target.files[0];
      if (validTypes.indexOf(file.type) === -1) {
        console.error('Invalid file type. Uplaod a jpg or png file.');
      } else if (file.size > 2000000) {
        console.error('File size is too large. The maximum size is 2MB');
      } else {
        const addPhoto = async () => {
          const data = await uploadPhoto('profilePhoto', file);
          const images = data.profile.images;
          props.setPhotos(images);
          if (data.error) {
            updateSnackBarMessage(data.error.message);
          } else {
            updateSnackBarMessage('You have successfully uploaded a new photo');
          }
        };
        addPhoto();
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

  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

  const { loggedInUser } = useContext(AuthContext);
  const loggedInUserId: string = loggedInUser !== null && loggedInUser !== undefined ? loggedInUser.id : '';

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(loggedInUserId)();
      setPhotos(data.profile.images);
    };
    fetchProfile();
  }, [loggedInUserId]);

  const [photos, setPhotos] = useState([]);

  const updateMainPhoto = (idx: number) => {
    const setNewMainPhoto = async () => {
      const data = await changeMainPhoto(idx);
      const images = data.profile.images;
      setPhotos(images);
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else {
        updateSnackBarMessage('You have successfully updated your main photo');
      }
    };
    setNewMainPhoto();
  };

  const handleDelete = (photo: string, index: number) => {
    const deleteCurrentPhoto = async () => {
      const data = await deletePhoto(photo, index);
      const images = data.profile.images;
      setPhotos(images);
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else {
        updateSnackBarMessage('You have successfully deleted a photo');
      }
    };
    deleteCurrentPhoto();
  };

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      {/* Replace the line below when using Reactour */}
      <Carousel autoPlay={false}>
        {photos.map((item, idx) => (
          <Grid key={idx} className={classes.photoContainer}>
            <Avatar alt="sampleImage" src={item} className={classes.large} />
            {idx === 0 ? (
              <Button className={classes.photoBtn} variant="contained" disabled={true}>
                This is your main photo
              </Button>
            ) : (
              <Button className={classes.photoBtn} variant="contained" onClick={() => updateMainPhoto(idx)}>
                Set as my main photo
              </Button>
            )}
            <Button onClick={() => handleDelete(item, idx)}>
              <Icon component={DeleteForeverIcon} />
              <Typography className={classes.deletePhotoText}>Delete Photo</Typography>
            </Button>
          </Grid>
        ))}
      </Carousel>
      <Typography className={classes.settingsSubheading}>
        Be sure to use a photo that clearly shows your face.
      </Typography>
      <InputBase
        classes={{ input: classes.inputBase }}
        name="profilePhoto"
        inputComponent={InputButton}
        inputProps={{ setPhotos }}
        type="file"
      />
    </Grid>
  );
}
