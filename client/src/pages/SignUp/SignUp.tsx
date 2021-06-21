import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';

import SignUpHeader from '../../components/SignUpHeader/SignUpHeader';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

import LogoImage from '../../mocks/logo.png';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    register(username, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} lg={12} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
               <img src={LogoImage} alt="logo" className={classes.logo}/>
                  <Grid container direction="row" justify="flex-end" alignItems="center">
                    <Typography className={classes.toolbarLink}>
                      <Link className={classes.secondaryLink} href='#'>
                        BECOME A SITTER
                      </Link>
                    </Typography>
                    <LoginHeader linkTo="/login" btnText="Log In" />
                    <SignUpHeader linkTo="/signup" btnText="Sign Up" />
                  </Grid>  
            </Toolbar>
          </AppBar>
          <Box width="100%" className={classes.contentArea} maxWidth={800} p={3} alignSelf="center">
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Sign Up
                </Typography>
              </Grid>
            </Grid>
            <SignUpForm handleSubmit={handleSubmit} />
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
