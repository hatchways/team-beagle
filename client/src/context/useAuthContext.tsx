import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import { Profile } from '../interface/Profile';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  userProfile: Profile | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess, newUser: boolean) => void;
  logout: () => void;
  // for notifications error
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  userProfile: undefined,
  updateLoginContext: () => null,
  logout: () => null,
  // for notifications error
  setLoggedInUser: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [userProfile, setUserProfile] = useState<Profile | null | undefined>();
  const history = useHistory();
  const updateLoginContext = useCallback((data: AuthApiDataSuccess, newUser: boolean) => {
    setLoggedInUser({ ...data.user, newUser });
    setUserProfile(data.profile);
  }, []);

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);
        setUserProfile(null);
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success, false);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          setUserProfile(null);

          // history.push('/landing');
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  return (
    <AuthContext.Provider value={{ loggedInUser, userProfile, updateLoginContext, logout, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
