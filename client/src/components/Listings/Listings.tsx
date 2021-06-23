import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';

import React, {useState, useEffect } from 'react';
import searchSitters from "../../helpers/APICalls/searchSitters";

import { User } from '../../interface/User';
import { Profile } from '../../interface/Profile';

const Listings = (): JSX.Element => {
  const classes = useStyles();
  // const [sitters, setSitters] = useState<Profile[]>([]);
  const [searchProfiles, setSearchProfiles] = useState<string>("");
  

  const updateProfiles = async () => {
    const sitterList: Profile[] = [];
    const data = await searchSitters(searchProfiles);
    const users: any = data.users;
    if (users) {
      users.map((user: User) => {
        if(user.profile) {
          sitterList.push(user.profile);
        }
      });
      console.log(sitterList)
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault()
    setSearchProfiles(e.target.value)
    console.log(searchProfiles);
  }

  useEffect(() => {
    updateProfiles();
  });


  //temp
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <Grid container component="main" direction="column" className={`${classes.root} ${classes.listings}`}>
      <CssBaseline />
      <Container className={classes.paper} maxWidth="md">
        <Typography className={classes.heading} variant="h4">
          Your search results
        </Typography>
        <Grid>
          <TextField
            id="outlined-basic"
            defaultValue="Toronto"
            variant="outlined"
            className={`${classes.textField} ${classes.textFieldLocation}`}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="date"
            type="date"
            defaultValue="2017-05-24"
            variant="outlined"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Container>
      {/* End search */}

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Paper className={classes.card} elevation={3}>
                <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className={classes.cardAvatar} />
                <Typography variant="h6" component="h2" className={classes.cardName}>
                  Norma Byers
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="p">
                  loving pet sitter
                </Typography>
                <Rating
                  value={2}
                  size="small"
                  readOnly
                  style={{
                    marginTop: '.4rem',
                    marginBottom: '.4rem',
                  }}
                />

                <Typography gutterBottom variant="button" component="p" className={classes.cardDescription}>
                  Dog sitting ,cat sitting, pocket pet and bird care
                </Typography>

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
                      Toronto
                    </Typography>
                  </Grid>

                  <Typography className={classes.cardFooterHr}>$14/hr</Typography>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};
export default Listings;
