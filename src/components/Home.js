import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <p class="Welcome">Welcome</p>
      <p class="email">
        You are logged as{" "}
        <strong>
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </strong>
      </p>
    </div>
  );
};

export default Home;
