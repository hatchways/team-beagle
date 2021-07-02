import { Typography, Card, Box, TextField, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import useStyles from './useStyles';
import { Profile } from '../../interface/Profile';

import { createBookingRequest } from '../../helpers/APICalls/requestBooking';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {useSnackBar} from '../../context/useSnackbarContext';
import {useAuth} from '../../context/useAuthContext';

interface Props {
  profile: Profile;
}

interface FormProps {
    startDate: string;
    endDate: string;
}


export default function BookingRequest({ profile }: any): JSX.Element {
  const classes = useStyles();
  const {loggedInUser} = useAuth(); 
  const {updateSnackBarMessage} = useSnackBar();
  console.log(profile)

    const handleSubmit = (values: FormProps, {setSubmitting}: FormikHelpers<FormProps>): void => {
        const {startDate, endDate} = values;
        const userId = loggedInUser?.id ? loggedInUser?.id : "";
        const sitterId = profile?.userId

    createBookingRequest({startDate, endDate, userId, sitterId}).then((data) => {
            if(data.error) {
            setSubmitting(false);
            updateSnackBarMessage(data.error);
            } else if (data.success) {
            setSubmitting(false);
            updateSnackBarMessage(data.success);
            }
        });
    };


  return (
    <Card className={classes.bookingCard}>
      <Box className={classes.bookingInfo}>
        <Typography className={classes.cardRate}>{profile.hourlyRate}/hr</Typography>
        <Rating value={4} size="small" readOnly className={classes.rating} />
      </Box>
      <Box className={classes.formArea}>
          <Formik
            initialValues={{
                startDate: '',
                endDate: '',
                        }}
            validationSchema={Yup.object().shape({
            startDate: Yup.string().required('Drop In Date is required'),
            endDate: Yup.string().required('Drop Off Date is required'),
            })}
            onSubmit={handleSubmit}
            >

            {({handleSubmit, handleChange, values, touched, errors, isSubmitting}) => (
            <form 
                className={classes.form} 
                noValidate
                onSubmit={handleSubmit}
            >
                <Box className={classes.date}>
                    <TextField
                    label={<Typography className={classes.label}>Drop In</Typography>}
                    id="dateStart"
                    type="date"
                    defaultValue={new Date()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        classes: { input: classes.inputs },
                    }}
                    helperText={touched.startDate ? errors.startDate : ''}
                    error={touched.startDate && Boolean(errors.startDate)}
                    value={values.startDate}
                    onChange={handleChange}
                    />
                    <TextField
                    label={<Typography className={classes.label}>Drop Off</Typography>}
                    id="dateEnd"
                    type="date"
                    defaultValue={new Date()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        classes: { input: classes.inputs },
                    }}
                    helperText={touched.endDate ? errors.endDate : ''}
                    error={touched.endDate && Boolean(errors.endDate)}
                    value={values.endDate}
                    onChange={handleChange}
                    />
                </Box>
            <Box>
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                SEND REQUEST
                </Button>
            </Box>
            </form>
            )}
        </Formik>  
      </Box>
    </Card>
  );
}
