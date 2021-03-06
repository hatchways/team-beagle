import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
import useStyles from './useStyles';

import { Link as RouterLink } from 'react-router-dom';
import AvatarImg from '../../Images/avatar.png';

import { Profile } from "../../interface/Profile";

interface CardProps {
  profile: Profile;
}


const ProfileCard: React.FC<CardProps> = ({ profile }) => {
  const classes = useStyles();

  return (
    <Link component={RouterLink} to={`/dashboard/${profile.userId}`}>
      <Paper className={classes.card} elevation={3}>
        <Avatar alt={profile.lastName} src={profile.images ? profile.images[0] : AvatarImg} className={classes.cardAvatar} />
        <Typography variant="h6" component="h2" className={classes.cardName}>
          {profile.firstName} {profile.lastName}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="p">
          {profile.tagLine}
        </Typography>
        <Rating
          value={profile.rating}
          size="small"
          readOnly
          style={{
            marginTop: '.4rem',
            marginBottom: '.4rem',
          }}
        />
        <Divider
          style={{
            width: '100%',
          }}
        />
        <Grid container direction="row" justify="space-between" className={classes.cardFooter}>
          <Grid
            container
            style={{
              width: 'auto',
            }}
            direction="row"
          >
            <RoomIcon color="primary" />
            <Typography className={classes.cardFooterLocation} variant="subtitle2" component="p">
              {profile.location}
            </Typography>
          </Grid>

          <Typography className={classes.cardFooterHr}>${profile.hourlyRate}/hr</Typography>
        </Grid>
      </Paper>
    </Link>
  );
};

export default ProfileCard;
