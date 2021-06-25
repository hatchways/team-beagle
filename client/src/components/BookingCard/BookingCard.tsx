import Grid from '@material-ui/core/Grid';
import useStyles from './useStyle';
import moment from 'moment';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Request } from './../../interface/Request';
import React from 'react';
interface Props {
  booking: Request;
  handleAccept: any;
  handleDecline: any;
  setState: React.Dispatch<any>;
  showActions: boolean;
  text: string;
  isDogStitter: boolean;
  handleCancelBooking: any;
}

export default function BookingCard({
  booking,
  handleAccept,
  handleDecline,
  setState,
  showActions,
  text = '',
  isDogStitter,
  handleCancelBooking,
}: Props): JSX.Element {
  const classes = useStyles();

  const profile = booking.profile;

  function statusSetter(isAccept: boolean, isDecline: boolean) {
    let res;
    if (isAccept === true && isDecline === false) res = 'ACCEPTED';
    if (isAccept === false && isDecline === true) res = 'DECLINE ';
    if (isAccept === false && isDecline === false) res = 'UNDECIDED';
    return res;
  }
  return (
    <React.Fragment>
      <CardContent>
        {text && (
          <Typography variant="subtitle2" className={classes.sectionTitle}>
            {text}
          </Typography>
        )}
        <Typography variant="h6" className={classes.cardDate}>
          {`${moment(booking.startDate).format('D MMM  YYYY')}  -  ${moment(booking.endDate).format('D MMM  YYYY')}`}
        </Typography>
        <Grid container direction="row" alignItems="center">
          <Avatar alt={profile.firstName} src={`${profile.images[0]}`} className={classes.cardAvatar} />
          <Typography variant="h6">{`${profile.firstName} ${profile.lastName}`}</Typography>

          {isDogStitter && (
            <Typography variant="body2" className={classes.cardStatus}>
              {statusSetter(booking.accept, booking.decline)}
            </Typography>
          )}
        </Grid>
      </CardContent>

      {isDogStitter && showActions && (
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => handleAccept(setState, booking._id)}>
            Accept
          </Button>
          <Button size="small" color="primary" onClick={() => handleDecline(setState, booking._id)}>
            Decline
          </Button>
        </CardActions>
      )}

      {!isDogStitter && showActions && (
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => handleCancelBooking(setState, booking._id)}>
            Cancel Booking
          </Button>
        </CardActions>
      )}
    </React.Fragment>
  );
}
