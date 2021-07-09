import { FunctionComponent } from 'react';
import { AuthContext } from '../context/useAuthContext';
import { mockLoggedInUser } from './mockUser';
import { mockUserProfile } from './mockProfile';

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        // for notifications error
        setLoggedInUser: jest.fn(),
        loggedInUser: mockLoggedInUser,
        userProfile: mockUserProfile,
        updateLoginContext: jest.fn(),
        updateProfileContext: jest.fn(),
        logout: jest.fn(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockUseAuthProvider;
