import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { FormikHelpers } from 'formik';
import useStyles from './useStyles';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../context/useAuthContext';
import login from '../../helpers/APICalls/login';

import DogsImage from '../../Images/dogs.jpeg';

export default function Landing(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext, loggedInUser } = useAuth();
  const history = useHistory();

  if (loggedInUser) history.push('/dashboard');
  const demoUserSubmit = () => {
    login('demo@hatchways.com', 'demo123').then((data) => {
      if (data.success) {
        updateLoginContext(data.success);
        history.push('/dashboard');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box width="100%">
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item lg={6} md={12} alignItems="center">
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Find the care your dog deserves
                </Typography>

                <Box className={classes.formArea}>
                  <form className={classes.form} noValidate>
                    <TextField
                      className={classes.location}
                      label={<Typography className={classes.label}>Where</Typography>}
                      id="outlined-basic"
                      placeholder="Search Sitter Locations"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        classes: { input: classes.inputs },
                      }}
                    />
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
                        Find My Dog Sitter
                      </Button>
                    </Box>
                    <Typography>
                      Not a Member?
                      <Link className={classes.secondaryLink} onClick={demoUserSubmit}>
                        Demo User
                      </Link>
                    </Typography>
                    <Box style={{ height: 40 }} />
                  </form>
                </Box>
              </Grid>
              <Hidden only={['xs', 'sm', 'md']}>
                <Grid item lg={6}>
                  <img src={DogsImage} alt="landingImage" className={classes.banner} />
                </Grid>
              </Hidden>
            </Grid>
          </Box>
          <Box alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
