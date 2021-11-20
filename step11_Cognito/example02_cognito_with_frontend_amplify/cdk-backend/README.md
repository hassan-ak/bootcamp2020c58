# CDK backend (userpool)

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
   const userPool = new cognito.UserPool(this, "userPool-Amplify", {
     userPoolName: "Amplify-frontend-UserPool",
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
       phoneNumber: {
         required: true,
         mutable: true,
       },
     },
   });
   ```

8. Update "lib/cdk-backend-stack.ts" to define user pool client

   ```javascript
   const userPoolClient = new cognito.UserPoolClient(
     this,
     "userPoolClient-Amplify",
     {
       userPool,
     }
   );
   ```

9. Update "lib/cdk-backend-stack.ts" to display userpool and client id on console

   ```javascript
   new cdk.CfnOutput(this, "User-Pool-Id", {
     value: userPool.userPoolId,
   });
   new cdk.CfnOutput(this, "User-PoolClient-Id", {
     value: userPoolClient.userPoolClientId,
   });
   ```

10. Deploy the app using `cdk deploy`
11. Pool and client Id will be printed in the console
12. Destroy the app after usage

## Reading Material

- [aws cognito module](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-cognito-readme.html)
- [Configuring a user pool app client](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-client-apps.html)
