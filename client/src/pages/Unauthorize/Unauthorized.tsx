import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

export default function Unauthorized(): JSX.Element {
  return (
    <Grid container component="main" alignItems="center" direction="column">
      <CssBaseline />
      <Box mt={5} />
      <Typography variant="h3" color="inherit" noWrap>
        Unauthorized
      </Typography>
      <Link component={RouterLink} to="/" variant="button" underline="always" color="textPrimary">
        Back to Home
      </Link>
    </Grid>
  );
}
