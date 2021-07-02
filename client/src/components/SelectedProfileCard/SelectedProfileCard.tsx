import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import React, { useState, useEffect } from 'react';
import useStyles from './useStyles';
import { ProfileProps } from '../Listings/Listings';
import { Profile } from '../../interface/Profile';
import BackgroundImage from '../../Images/house.jpeg';
import AvatarPic from '../../Images/avatar.png';

interface Props {
  profile: Profile;
}
// interface ExtendProfile extends Profile {
//     later(email: string, after: number): boolean
// }

export default function SelectedProfileCard({ profile }: any): JSX.Element {
  const classes = useStyles();
  console.log(profile);
  return (
    <Card className={classes.contentArea}>
      <CardMedia className={classes.cardMedia} image={BackgroundImage} />
      <Avatar alt="User" src={AvatarPic} className={classes.cardAvatar} />
      <Grid className={classes.profileInfo}>
        <Box className={classes.infoSection}>
          <Typography variant="h6" component="h2" className={classes.cardName}>
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="p">
            {profile.description}
          </Typography>
          <Typography className={classes.cardFooterLocation} variant="subtitle2" component="p">
            <RoomIcon color="primary" />
            {profile.location}
          </Typography>
        </Box>
      </Grid>
      <Divider className={classes.divider} />
      <Box className={classes.cardBody}>
        <Typography gutterBottom variant="button" component="h6" className={classes.cardDescription}>
          About Me
        </Typography>
        <Typography variant="body1" component="p" className={classes.cardText}>
          {profile.description}
        </Typography>

        <Grid container direction="row" justify="space-between" className={classes.cardFooter}>
          {/* {profile.displayImages?.map((imgs: string, index: number) => {
                                <CardMedia src={imgs} key={index}/>
                            })} */}
        </Grid>
      </Box>
    </Card>
  );
}
