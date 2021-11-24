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
16.
