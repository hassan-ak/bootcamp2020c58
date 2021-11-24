import React, { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          getUser().then((userData) => setUser(userData));
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });

    getUser().then((userData) => {
      setUser(userData);
      console.log("Signed In:", userData);
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not Signed In"));
  }

  return <div>Home Page</div>;
}
