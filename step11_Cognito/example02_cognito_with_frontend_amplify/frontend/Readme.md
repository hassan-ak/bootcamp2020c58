# AWS cognito in Gatsby APP using Amplify

## Steps to code

1. Create a new directory by using `mkdir frontend`
2. Naviagte to the newly created directory using `cd frontend`
3. use `yarn init` to initilize a yarn project in the directory which creates a package.json file with the following content
   ```json
   {
     "name": "frontend",
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
12. Install aws amplify in the app using `yarn add aws-amplify`
13. Install amplify ui in the app using `yarn add @aws-amplify/ui-react@v1`
