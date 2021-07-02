import {
  Typography,
  Card,
  Box,
  TextField,
  Button,
} from '@material-ui/core';
import {useState} from 'react';
import { Rating } from '@material-ui/lab';
import useStyles from './useStyles';

import ProfileCard from "../ProfileCard/ProfileCard";

    interface Props {
        profile: {
            hourlyRate: number
        };
    }

export default function BookingRequest({profile}: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Card className={classes.bookingCard}>
          <Box className={classes.bookingInfo}>
            <Typography className={classes.cardRate}>/hr</Typography>
              <Rating
                      value={4}
                      size="small"
                      readOnly
                      className={classes.rating}
                      />
          </Box>
          <Box className={classes.formArea}>
                  <form className={classes.form} noValidate>
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
                            />
                        </Box>
                            <Box>
                                <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                                    SEND REQUEST
                                </Button>
                        </Box>
                    </form>
                </Box>  
        </Card>
  );
};
