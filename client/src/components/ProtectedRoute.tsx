import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from './../context/useAuthContext';

interface Props extends RouteProps {
  component: React.ComponentType;
}

const ProtectedRoute = ({ component: Component, ...rest }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
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
      }}
    />
  );
};

export default ProtectedRoute;
