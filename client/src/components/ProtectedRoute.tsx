import React, { useState, useEffect } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from './../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

interface Props extends RouteProps {
  component: React.ComponentType;
}

const ProtectedRoute = ({ component: Component, ...rest }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  const [show, setShow] = useState(false);
  const delay = 1;
  useEffect(() => {
    const timer1 = setTimeout(() => setShow(true), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (show) {
          if (loggedInUser) {
            return <Component {...rest} {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/unauthorized',
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        } else {
          return (
            <Grid container justify="center" alignItems="center">
              <Box mt={20}></Box>
              <CircularProgress></CircularProgress>
            </Grid>
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
