import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import { useSocket } from '../../context/useSocketContext';
import { useEffect } from 'react';

import Listings from '../../components/Listings/Listings';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { initSocket } = useSocket();


  useEffect(() => {
    initSocket();
    // return () => {
    //   socket.close();
    // }
  }, [initSocket]);

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />

      <Listings />
    </Grid>
  );
}
