import React from "react";
import { useAuth } from "../contexts/AuthContext";
 
const Home = () => {
 const { currentUser } = useAuth();
 
 return (
  <div>
    <p className="Welcome">Welcome</p>
    <p className="email">
       You are logged in as <strong>{currentUser && currentUser.email}</strong>
     </p>
 </div>
 );
};
 
export default Home;