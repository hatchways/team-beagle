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
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import Sitters from './pages/Sitters/Sitter';
import Messages from './pages/Messages/Messages';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorize/Unauthorized';
import Booking from './pages/Bookings/Bookings';
import DateFnsUtils from '@date-io/date-fns';

import './App.css';

function App(): JSX.Element {
  return (
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

                  <ProtectedRoute exact path="/sitters" component={Sitters} />
                  <ProtectedRoute exact path="/messages" component={Messages} />
                  <ProtectedRoute exact path="/profile/:menuitem" component={Profile} />
                  <Route exact path="/profile">
                    <Redirect to="/profile/editprofile" />
                  </Route>

                  <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/bookings">
                    <Booking />
                  </Route>
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
  );
}

export default App;
