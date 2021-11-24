import React from "react";
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

export default function Home() {
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not Signed In"));
  }

  return <div>Home Page</div>;
}
