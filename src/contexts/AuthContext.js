import {createContext, useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'

const AuthContext = createContext()

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
    const [ currentUser, setCurrentUser] = useState(null);
    const [loadingPage, setloadingPage] = useState(true)

    const login = (email,password) => {
      return auth.signInWithEmailAndPassword(email,password)  
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const signup = (email, password) => {
        //sign up
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const updateEmail = (email) => {
        return currentUser.updateEmail( email)
    }

    const updatePassword = (password) =>{
        return currentUser.updatePassword(password)
    }

    const updateProfile = (name) => {
        return currentUser.updateProfile({ 
            displayName: name 
        })
    }

    useEffect(() => { 
       const subscribe = auth.onAuthStateChanged(user => {
           
          setCurrentUser(user)
          setloadingPage(false) 
        }); 
        return subscribe
    },[])

    const contextValues = {
        currentUser,
        loadingPage,
        login,
        logout,
        resetPassword,
        signup,
        updateEmail,
        updatePassword,
        updateProfile,
    }

    return(
        <AuthContext.Provider value={contextValues}>
            {!loadingPage && props.children}
        </AuthContext.Provider>
    )
}


export {AuthContext, useAuth, AuthContextProvider as default}
