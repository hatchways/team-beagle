import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStyles from './useStyles';

import BackgroundImage from "../../Images/house.jpeg"
import AvatarPic from "../../Images/avatar.png"



export default function ProfileDetails(): JSX.Element {
    const classes = useStyles();



  return (
    <Grid container className={`${classes.root}`}>
      <CssBaseline />
      <Box className={classes.contentSection}>
        <Card className={classes.contentArea}>
            <CardMedia
            className={classes.cardMedia}
            image={BackgroundImage}
          />
          <Avatar alt="User" src={AvatarPic} className={classes.cardAvatar} />
            <Grid className={classes.profileInfo}>
                <Box className={classes.infoSection}>
                    <Typography variant="h6" component="h2" className={classes.cardName}>
                        Norma Byer
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="p">
                    Loving Pet Sitter
                    </Typography>
                    <Typography className={classes.cardFooterLocation} variant="subtitle2" component="p">
                      <RoomIcon color="primary" /> Toronto, Ontario
                    </Typography>
                </Box>
            </Grid>
            <Divider
                  style={{
                    width: '100%',
                  }}
                />
             <Box className={classes.cardBody}>
                <Typography gutterBottom variant="button" component="h6" className={classes.cardDescription}>
                  About Me
                </Typography>
                <Typography variant="body1" component="p" className={classes.cardText}>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius felis sed ultricies egestas. Aenean in neque vitae nibh commodo ullamcorper. Nulla vel commodo libero. Aenean purus lorem, pulvinar id arcu eu, ullamcorper sollicitudin quam. Aliquam fringilla eleifend fringilla. Curabitur placerat massa eu lacus faucibus molestie.
                </Typography>

                
                <Grid container direction="row" justify="space-between" className={classes.cardFooter}>
                   Images Go Here 
                </Grid>
            </Box>

        </Card>
        <Card className={classes.bookingCard}>
          <Box className={classes.bookingInfo}>
            <Typography className={classes.cardRate}>$14/hr</Typography>
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
                    
       </Box>
    </Grid>
  );
}

