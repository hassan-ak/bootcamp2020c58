# CDK backend (Google Login)

## Steps to code

1. Create a new directory by using `mkdir cdk-backend`
2. Naviagte to the newly created directory using `cd cdk-backend`
3. Create a cdk app using `cdk init app --language typescript`
4. Use `npm run watch` to auto build our app as we code
5. Install AWS cognito using `npm i @aws-cdk/aws-cognito`
6. Update "lib/cdk-backend-stack.ts" to import cognito in the app

   ```javascript
   import * as cognito from "@aws-cdk/aws-cognito";
   ```

7. Update "lib/cdk-backend-stack.ts" to define user pool

   ```javascript
   const userPool = new cognito.UserPool(this, "step03UserPool", {
     userPoolName: "Step03 Google Login User Pool",
     selfSignUpEnabled: true,
     accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
     userVerification: {
       emailStyle: cognito.VerificationEmailStyle.CODE,
     },
     autoVerify: {
       email: true,
     },
     standardAttributes: {
       email: {
         required: true,
         mutable: true,
       },
     },
   });
   ```

8. Update "lib/cdk-backend-stack.ts" to define domain prefix for the userpool

   ```javascript
   const domain = userPool.addDomain("userPoolDomain", {
     cognitoDomain: {
       domainPrefix: "bc2020c58-step03",
     },
   });
   ```

9. Update "lib/cdk-backend-stack.ts" to define userpool client

   ```javascript
   const userPoolClient = new cognito.UserPoolClient(this, "amplifyClient", {
     userPool,
     oAuth: {
       callbackUrls: ["http://localhost:8000/"],
       logoutUrls: ["http://localhost:8000/"],
     },
   });
   ```

10. Update "lib/cdk-backend-stack.ts" to get domain base url on console which is then be used in next step. Few other properties are displayed as well

    ```javascript
    new cdk.CfnOutput(this, "UserPool_region", {
      value: this.region,
    });
    new cdk.CfnOutput(this, "UserPool_domain", {
      value: domain.domainName,
    });
    new cdk.CfnOutput(this, "UserPool_Base_URL", {
      value: domain.baseUrl(),
    });
    new cdk.CfnOutput(this, "UserPool_ID", {
      value: userPool.userPoolId,
    });
    new cdk.CfnOutput(this, "UserPool_client_ID", {
      value: userPoolClient.userPoolClientId,
    });
    ```
