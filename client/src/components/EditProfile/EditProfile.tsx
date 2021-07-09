import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/useAuthContext';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Switch,
  InputAdornment,
  FormHelperText,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import editProfile from '../../helpers/APICalls/editProfile';
import getProfile from '../../helpers/APICalls/getProfile';
import { useSnackBar } from '../../context/useSnackbarContext';
import { CurrentProfile } from '../../interface/AuthApiData';
import { useHistory } from 'react-router-dom';
import Tour from 'reactour';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();

  const [isTourOpen, setIsTourOpen] = useState(true);
  const [isDogSitter, setIsDogSitter] = useState(false);
  const [CurrentProfile, setCurrentProfile] = useState<CurrentProfile>({
    profile: {
      isDogSitter: false,
      firstName: '',
      lastName: '',
      location: '',
      description: '',
      hourlyRate: 1,
      tagLine: '',
      availability: {
        Sunday: {
          am: false,
          pm: false,
        },
        Monday: {
          am: false,
          pm: false,
        },
        Tuesday: {
          am: false,
          pm: false,
        },
        Wednesday: {
          am: false,
          pm: false,
        },
        Thursday: {
          am: false,
          pm: false,
        },
        Friday: {
          am: false,
          pm: false,
        },
        Saturday: {
          am: false,
          pm: false,
        },
      },
    },
  });

  interface loggedInUser {
    email: string;
    id: string;
    username: string;
  }

  const { loggedInUser, updateProfileContext } = useContext(AuthContext);
  const loggedInUserId: string = loggedInUser !== null && loggedInUser !== undefined ? loggedInUser.id : '';

  const handleSwitch = () => {
    formik.setFieldValue('isDogSitter', !isDogSitter);
    setIsDogSitter(!isDogSitter);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

  const handleSubmit = ({
    isDogSitter,
    firstName,
    lastName,
    selfDescription,
    hourlyRate,
    tagLine,
    availability,
  }: {
    isDogSitter: boolean;
    firstName: string;
    lastName: string;
    selfDescription: string;
    hourlyRate: number;
    tagLine: string;
    availability: {
      Sunday: {
        am: boolean;
        pm: boolean;
      };
      Monday: {
        am: boolean;
        pm: boolean;
      };
      Tuesday: {
        am: boolean;
        pm: boolean;
      };
      Wednesday: {
        am: boolean;
        pm: boolean;
      };
      Thursday: {
        am: boolean;
        pm: boolean;
      };
      Friday: {
        am: boolean;
        pm: boolean;
      };
      Saturday: {
        am: boolean;
        pm: boolean;
      };
    };
  }) => {
    editProfile(
      loggedInUserId,
      isDogSitter,
      firstName,
      lastName,
      selfDescription,
      hourlyRate,
      tagLine,
      availability,
    ).then((data: any) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else {
        updateSnackBarMessage('Your profile has been upated');
        updateProfileContext(data.profile);
        if (loggedInUser?.newUser === true) history.push({ pathname: '/dashboard' });
      }
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(loggedInUserId)();
      if (data.profile) {
        setCurrentProfile(data);
        updateProfileContext(data.profile);
        setIsDogSitter(data.profile.isDogSitter);
      }
    };
    fetchProfile();
  }, [loggedInUserId, updateProfileContext]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      isDogSitter: CurrentProfile.profile.isDogSitter,
      firstName: CurrentProfile.profile.firstName,
      lastName: CurrentProfile.profile.lastName === '(n/a)' ? '' : CurrentProfile.profile.lastName,
      primaryPhone: '',
      secondaryPhone: '',
      location:
        CurrentProfile.profile.location === '(this user has not set a location yet)'
          ? ''
          : CurrentProfile.profile.location,
      selfDescription:
        CurrentProfile.profile.description === '(this user has not written a description yet)'
          ? ''
          : CurrentProfile.profile.description,
      hourlyRate: CurrentProfile.profile.hourlyRate,
      tagLine: CurrentProfile.profile.tagLine,
      availability: {
        Sunday: {
          am: false,
          pm: false,
        },
        Monday: {
          am: false,
          pm: false,
        },
        Tuesday: {
          am: false,
          pm: false,
        },
        Wednesday: {
          am: false,
          pm: false,
        },
        Thursday: {
          am: false,
          pm: false,
        },
        Friday: {
          am: false,
          pm: false,
        },
        Saturday: {
          am: false,
          pm: false,
        },
      },
    },
    validationSchema: Yup.object({
      isDogSitter: Yup.boolean().required(),
      firstName: Yup.string()
        .max(20, 'Please enter a first name that is 20 characters or less')
        .required('Your first name is required'),
      lastName: Yup.string()
        .max(20, 'Please enter a last name that is 20 characters or less')
        .required('Your last name is required'),
      primaryPhone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .max(14, 'You must enter a ten-digit phone number with the area code')
        .min(10, 'You must enter a ten-digit phone number with the area code')
        .required('Your primary phone is required'),
      secondaryPhone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .max(14, 'You must enter a ten-digit phone number with the area code')
        .min(10, 'You must enter a ten-digit phone number with the area code'),
      location: Yup.string()
        .max(40, 'Please enter your address in 40 characters or less')
        .required('Your address is required'),
      selfDescription: Yup.string()
        .max(300, 'Please describe yourself in 300 characters or less')
        .required('Your self description is required'),
      hourlyRate:
        isDogSitter === true
          ? Yup.number()
              .test('This is a valid rate', 'This is not a valid rate', (value) =>
                value !== undefined ? /^\d+(?:\.\d{1,2})?$/.test(value.toString()) : false,
              )
              .max(200, 'The maximum you can charge is $200/hour')
              .min(1, 'The minimum you can charge is $1/hour')
              .required()
          : Yup.number(),
      tagLine:
        isDogSitter === true
          ? Yup.string().max(50, 'Please write a tagline in 50 characters or less').required('A tagline is required')
          : Yup.string().max(50, 'Please write a tagline in 50 characters or less'),
      availability:
        isDogSitter === true
          ? Yup.object({
              Sunday: Yup.object({
                am: Yup.boolean(),
                pm: Yup.boolean(),
              }),
              Monday: Yup.object({
                am: Yup.boolean(),
                pm: Yup.boolean(),
              }),
              Tuesday: Yup.object({
                am: Yup.boolean(),
                pm: Yup.boolean(),
              }),
              Wednesday: Yup.object({
                am: Yup.boolean(),
                pm: Yup.boolean(),
              }),
              Thursday: Yup.object({
                am: Yup.boolean(),
                pm: Yup.boolean(),
              }),
              Friday: Yup.object({
                am: Yup.boolean(),
                pm: Yup.boolean(),
              }),
              Saturday: Yup.object({
                am: Yup.boolean(),
                pm: Yup.boolean(),
              }),
            }).required()
          : Yup.object(),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  const steps = [
    {
      content: 'Welcome to Loving Sitter! The #1 place to find dogsitters on the internet!',
    },
    {
      selector: '.first-step',
      content: "To begin, let's start with setting up your profile!",
    },
    {
      selector: '.third-step',
      content: 'Be sure to turn on this toggle if you want to work as a dogsitter',
    },
  ];

  return (
    <Grid className={`${classes.root} first-step`}>
      <CssBaseline />
      {loggedInUser?.newUser === true && (
        <Tour steps={steps} isOpen={isTourOpen} onRequestClose={() => setIsTourOpen(false)} />
      )}
      <form onSubmit={formik.handleSubmit}>
        <Grid className={`${classes.formItem} second-step `}>
          <Typography className={classes.formLabel}>I WANT TO DOG SIT</Typography>
          <Switch
            className="third-step"
            id="isDogSitter"
            checked={isDogSitter}
            onChange={handleSwitch}
            name="isDogSitter"
          />
        </Grid>

        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>FIRST NAME</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="John"
            type="string"
            id="firstName"
            error={formik.touched.firstName && formik.errors.firstName !== undefined}
            helperText={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ''}
            {...formik.getFieldProps('firstName')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.touched.firstName && !formik.errors.firstName && <CheckCircleIcon />}
                  {formik.touched.firstName && formik.errors.firstName && <ErrorIcon />}
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
            id="lastName"
            {...formik.getFieldProps('lastName')}
            error={formik.touched.lastName && formik.errors.lastName !== undefined}
            helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.touched.lastName && !formik.errors.lastName && <CheckCircleIcon />}
                  {formik.touched.lastName && formik.errors.lastName && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>PHONE NUMBERS</Typography>
          <Grid className={classes.phoneContainer}>
            <TextField
              className={`${classes.formInput}`}
              size="small"
              type="string"
              variant="outlined"
              placeholder="Example: 1234567890"
              {...formik.getFieldProps('primaryPhone')}
              error={formik.touched.primaryPhone && formik.errors.primaryPhone !== undefined}
              label="Primary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.touched.primaryPhone && !formik.errors.primaryPhone && <CheckCircleIcon />}
                    {formik.touched.primaryPhone && formik.errors.primaryPhone && <ErrorIcon />}
                  </InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 14 }}
            />
            <TextField
              className={`${classes.formInput}`}
              size="small"
              type="string"
              variant="outlined"
              placeholder="Example: 1234567890"
              {...formik.getFieldProps('secondaryPhone')}
              error={formik.touched.secondaryPhone && formik.errors.secondaryPhone !== undefined}
              label="Secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.touched.secondaryPhone && !formik.errors.secondaryPhone && <CheckCircleIcon />}
                    {formik.touched.secondaryPhone && formik.errors.secondaryPhone && <ErrorIcon />}
                  </InputAdornment>
                ),
              }}
              inputProps={{ maxLength: 14 }}
            />
          </Grid>
        </Grid>
        <FormHelperText
          error={
            formik.touched.primaryPhone &&
            formik.touched.secondaryPhone &&
            (formik.errors.primaryPhone !== undefined || formik.errors.secondaryPhone !== undefined)
          }
          className={classes.phoneHelperText}
        >
          Include the digits only with no spaces
        </FormHelperText>
        <Grid className={classes.formItem}>
          <Typography className={classes.formLabel}>WHERE YOU LIVE</Typography>
          <TextField
            className={`${classes.formInput}`}
            size="small"
            variant="outlined"
            placeholder="Address"
            {...formik.getFieldProps('location')}
            error={formik.touched.location && formik.errors.location !== undefined}
            helperText={formik.touched.location && formik.errors.location ? formik.errors.location : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.touched.location && !formik.errors.location && <CheckCircleIcon />}
                  {formik.touched.location && formik.errors.location && <ErrorIcon />}
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
            {...formik.getFieldProps('selfDescription')}
            error={formik.touched.selfDescription && formik.errors.selfDescription !== undefined}
            helperText={
              formik.touched.selfDescription && formik.errors.selfDescription ? formik.errors.selfDescription : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {formik.touched.selfDescription && !formik.errors.selfDescription && <CheckCircleIcon />}
                  {formik.touched.selfDescription && formik.errors.selfDescription && <ErrorIcon />}
                </InputAdornment>
              ),
            }}
            inputProps={{ maxLength: 300 }}
          />
        </Grid>
        {isDogSitter === true && (
          <Grid>
            <Grid className={classes.formItem}>
              <Typography className={classes.formLabel}>TAGLINE</Typography>
              <TextField
                className={`${classes.formInput}`}
                size="small"
                variant="outlined"
                placeholder="Write a short tagline here in 50 characters or less"
                {...formik.getFieldProps('tagLine')}
                error={formik.touched.tagLine && formik.errors.tagLine !== undefined}
                helperText={formik.touched.tagLine && formik.errors.tagLine ? formik.errors.tagLine : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {formik.touched.tagLine && !formik.errors.tagLine && <CheckCircleIcon />}
                      {formik.touched.tagLine && formik.errors.tagLine && <ErrorIcon />}
                    </InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 40 }}
              />
            </Grid>
            <Grid className={classes.formItem}>
              <Typography className={classes.formLabel}>HOURLY RATE</Typography>
              <TextField
                className={`${classes.formInput}`}
                size="small"
                type="number"
                variant="outlined"
                placeholder="Set an hourly rate (maximum $200/hour)"
                {...formik.getFieldProps('hourlyRate')}
                error={formik.touched.hourlyRate && formik.errors.hourlyRate !== undefined}
                helperText={formik.touched.hourlyRate && formik.errors.hourlyRate ? formik.errors.hourlyRate : ''}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      {formik.touched.hourlyRate && !formik.errors.hourlyRate && <CheckCircleIcon />}
                      {formik.touched.hourlyRate && formik.errors.hourlyRate && <ErrorIcon />}
                    </InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 40 }}
              />
            </Grid>

            <Grid className={classes.formItem}>
              <Typography className={classes.formLabel}>AVAILABILITY</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>AM/PM</TableCell>
                    {DAYS_OF_THE_WEEK.map((day) => (
                      <TableCell key={day} padding="none">
                        {`${day.slice(0, 3)}.`}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>AM</TableCell>
                    {DAYS_OF_THE_WEEK.map((day) => (
                      <TableCell padding="none" key={`${day}-am`}>
                        <Checkbox
                          id={`availability.${day}.am`}
                          name={`availability.${day}.am`}
                          value={`formik.values.availability.${day}.am`}
                          onChange={formik.handleChange}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>PM</TableCell>
                    {DAYS_OF_THE_WEEK.map((day) => (
                      <TableCell padding="none" key={`${day}-pm`}>
                        <Checkbox
                          id={`availability.${day}.pm`}
                          name={`availability.${day}.pm`}
                          value={`formik.values.availability.${day}.pm`}
                          onChange={formik.handleChange}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        )}
        <Grid className={classes.submitBtn}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
