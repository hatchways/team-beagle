import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyle';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Request } from './../../interface/Request';
interface Props {
  booking: Request;
  handleAccept: any;
  handleDecline: any;
  setState: any;
  showActions: boolean;
}

export default function BookingCard({
  booking,
  handleAccept,
  handleDecline,
  setState,
  showActions,
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
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />

      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.cardDate}>
            {moment(booking.startDate).format('D MMM  YYYY')}
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Avatar alt={profile.firstName} src={`${profile.images[0]}`} className={classes.cardAvatar} />
            <Typography variant="h6">{`${profile.firstName} ${profile.lastName}`}</Typography>

            <Typography variant="body2" className={classes.cardStatus}>
              {statusSetter(booking.accept, booking.decline)}
            </Typography>
          </Grid>
        </CardContent>
        {showActions && (
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={() => handleAccept(setState, booking._id)}>
              Accept
            </Button>
            <Button size="small" color="primary" onClick={() => handleDecline(setState, booking._id)}>
              Decline
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
