# Define Userpool

## Steps using AWS console

1. Signin to AWS web console
2. Navigate to Cognito services
3. Select manage userpools
4. Select create new user pool
5. Foolow the instruction.

## Steps using cdk

1. Create a new directory by using `mkdir example00_define_userpool`
2. Naviagte to the newly created directory using `cd example00_define_userpool`
3. Create a cdk app using `cdk init app --language typescript`
4. Use `npm run watch` to auto build our app as we code
5. Install AWS Cognito in the app using `npm i @aws-cdk/aws-cognito`
6. Update "lib/example00_define_userpool.ts" to import cognito in the stack

   ```
   import * as cognito from "@aws-cdk/aws-cognito";
   ```

7. Update "lib/example00_define_userpool.ts" to define user pool

   ```
   const userPool = new cognito.UserPool(this, "TestUserPool", {
      userPoolName: "Test User Pool",
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: { email: true }, // Set email as an alias
      userVerification: {
        emailSubject: "Verify your email for our awesome app!",
        emailBody:
          "Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}",
        emailStyle: cognito.VerificationEmailStyle.CODE,
      }, ///customize email and sms
      standardAttributes: {
        fullname: {
          required: true,
          mutable: false,
        },
      }, ////Attributes already define by cognito
      customAttributes: {
        myappid: new cognito.StringAttribute({
          minLen: 5,
          maxLen: 15,
          mutable: false,
        }),
      }, ////Custom Attributes defined according to the application needs
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
        tempPasswordValidity: cdk.Duration.days(3),
      }, ///Password Policy
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY, ///Account Recovery email
    });

   ```

8. Deploy the app using cdk deploy
9. Deployed user pool can be viewd in AWS console
10. Destroy the app using cdk destroy

## Reading Material

- [Coginto CDK](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-cognito-readme.html)
- [User Pool CDK Contructs](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-cognito.UserPool.html)
