# Gatsby + Amplify Cognito with Google Signin.

## Steps to code

1. Create a new directory by using `mkdir googlelogin`
2. Naviagte to the newly created directory using `cd googlelogin`
3. use `npm init` to initilize an yarn project in the directory which creates a package.json file with the following content
   ```json
   {
     "name": "googlelogin",
     "version": "1.0.0",
     "main": "index.js",
     "license": "MIT"
   }
   ```
4. Install gatsby, react and react dom using `yarn add gatsby react react-dom`. This will update packge.json and create node_modules.json along with yarn.lock
5. update package.json to add scripts

   ```json
   "scripts": {
      "develop": "gatsby develop",
      "build": "gatsby build",
      "clean": "gatsby clean"
   }
   ```

6. create gatsby-config.js

   ```javascript
   module.exports = {
     plugins: [],
   };
   ```

7. create "src/pages/index.tsx"

   ```javascript
   import React from "react";
   export default function Home() {
     return <div>Home Page</div>;
   }
   ```

8. create "src/pages/404.tsx"

   ```javascript
   import React from "react";
   export default function Error() {
     return <div>Error Page</div>;
   }
   ```

9. create "static/favicon.ico"

10. create ".gitignore"

    ```
    node_modules/
    .cache
    public/
    ```

11. To run the site use `gatsby develop`
12. Make this app an amplify project by using `amplify init`
13. Run the app using `amplify serve`
14. Update "src/aws-exports.js" to define user pool parameters in the app

    ```javascript
    const awsmobile = {
      aws_project_region: "Enter Your Project Region",
      aws_cognito_region: "Enter Your Cognito Region",
      aws_user_pools_id: "ENTER YOUR USER POOL ID",
      aws_user_pools_web_client_id: "ENTER YOUR CLIENT ID",
      oauth: {
        domain: "// ENTER YOUR COGNITO DOMAIN",
        scope: ["phone", "email", "openid", "profile"],
        redirectSignIn: "ENTER YOUR SITE",
        redirectSignOut: "ENTER YOUR SITE",
        responseType: "code",
      },
      federationTarget: "COGNITO_USER_POOLS",
    };

    export default awsmobile;
    ```

15. Install amplify in the app using `yarn add aws-amplify`
16. Configure amplify

    ```javascript
    import Amplify from "aws-amplify";
    import awsmobile from "../aws-exports";

    Amplify.configure(awsmobile);
    ```

17. Define a function to get user

    ```javascript
    function getUser() {
      return Auth.currentAuthenticatedUser()
        .then((userData) => userData)
        .catch(() => console.log("Not Signed In"));
    }
    ```

18. Create a aws Hub to listen to data

    ```javascript
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
    ```

19. Update "src.pages/index.tsx"

    ```javascript
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
    ```

## Reading Material

- [Amplify Client Config](https://docs.amplify.aws/lib/client-configuration/configuring-amplify-categories/q/platform/js/)
- [Amplify Hub](https://docs.amplify.aws/lib/utilities/hub/q/platform/js/)
