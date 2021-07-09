import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { useSocket } from '../../context/useSocketContext';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/useAuthContext';

import Listings from '../../components/Listings/Listings';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { socket } = useSocket();
  const { loggedInUser } = useContext(AuthContext);

  socket !== undefined && loggedInUser !== undefined && loggedInUser !== null && socket.emit('login', loggedInUser.id);

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />

      <Listings />
    </Grid>
  );
}
