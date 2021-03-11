import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <p class="Welcome">Welcome</p>
      <p class="email">
        {currentUser
          ? `You are logged as ${(
              <strong>
                {currentUser.displayName
                  ? currentUser.displayName
                  : currentUser.email}
              </strong>
            )}`
          : "welcome HERE"}
      </p>
    </div>
  );
};

export default Home;
