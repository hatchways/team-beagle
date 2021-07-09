import React, { useState, useEffect } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

interface Props extends RouteProps {
  component: React.ComponentType;
}

const RedirectLoggedInRoute = ({ component: Component, ...rest }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedInUser === undefined) {
          return (
            <Grid container justify="center" alignItems="center">
              <Box mt={20}></Box>
              <CircularProgress></CircularProgress>
            </Grid>
          );
        } else {
          if (!loggedInUser) {
            return <Component {...rest} {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/',
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }
      }}
    />
  );
};

export default RedirectLoggedInRoute;
