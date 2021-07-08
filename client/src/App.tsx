import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Landing from './pages/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Messages from './pages/Messages/Messages';
import Notifications from './pages/Notifications/Notifications';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorize/Unauthorized';
import BookingTabs from './pages/Booking/BookingTabs';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './App.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PKEY || '');

function App(): JSX.Element {
  return (
    <Elements stripe={stripePromise}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackBarProvider>
            <AuthProvider>
              <SocketProvider>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <NavBar />

                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />

                    <ProtectedRoute exact path="/sitters" component={BookingTabs} />
                    <ProtectedRoute exact path="/messages" component={Messages} />
                    <ProtectedRoute exact path="/notifications" component={Notifications} />
                    <ProtectedRoute exact path="/profile/:menuitem" component={Profile} />
                    <Route exact path="/profile">
                      <Redirect to="/profile/editprofile" />
                    </Route>

                    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                    <ProtectedRoute exact path="/dashboard/:userId" component={ProfileDetails} />
                    <Route exact path="/unauthorized">
                      <Unauthorized />
                    </Route>
                    <Route path="*">
                      <Redirect to="/" />
                    </Route>
                  </Switch>
                </MuiPickersUtilsProvider>
              </SocketProvider>
            </AuthProvider>
          </SnackBarProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    </Elements>
  );
}

export default App;
