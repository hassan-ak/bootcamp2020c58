import React, { useEffect, useState } from "react";
import Amplify, { Hub, Auth } from "aws-amplify";
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

  return (
    <main style={{ display: "grid", placeItems: "center", height: "100%" }}>
      {user ? (
        <div>
          <button onClick={() => Auth.signOut()}>
            <h1>Sign out</h1>
          </button>
          <h1>User Data object:</h1>
          <div style={{ width: "700px", height: "70vh", overflow: "scroll" }}>
            <pre>User: {user.username}</pre>
          </div>
        </div>
      ) : (
        <div>
          <h1>No User Logged In.</h1>
          <button onClick={() => Auth.federatedSignIn({ provider: "Google" })}>
            Sign In with Google
          </button>
        </div>
      )}
    </main>
  );
}
