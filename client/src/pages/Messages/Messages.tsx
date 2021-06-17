import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';

export default function Messages(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      Messages
    </Grid>
  );
}
