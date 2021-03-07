import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = props => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setCurrentUser(null);
    return auth.signOut();
  };

  const resetPassword = email => {
    return auth.sendPasswordResetEmail(email);
  };

  const singup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const updateEmail = email => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = password => {
    return currentUser.updatePassword(password);
  };

  const updateProfile = name => {
    return currentUser.updateProfile({
      displayName: name
    });
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubcribe;
  }, []);

  const contextValues = {
    loading,
    login,
    logout,
    singup,
    resetPassword,
    currentUser,
    updateEmail,
    updatePassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {loading && <p>Loading...</p>}
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
