# Step 11-02 Cognito User pool with Lmabda Trigger

## Steps to code

1.  Create a new directory by using `mkdir example01_userpool_with_lambda_trigger`
2.  Naviagte to the newly created directory using `cd example01_userpool_with_lambda_trigger`
3.  Create a cdk app using `cdk init app --language typescript`
4.  Use `npm run watch` to auto build our app as we code
5.  Install AWS cognito using `npm i @aws-cdk/aws-cognito`
6.  Install lambda using `npm i @aws-cdk/aws-lambda`
7.  Import aws cognito and lambda in the app by updating "lib/example01_userpool_with_lambda_trigger-stack.ts"

    ```
    import * as cognito from "@aws-cdk/aws-cognito";
    import * as lambda from "@aws-cdk/aws-lambda";
    ```

8.  Install aws sdk using `npm i aws-sdk`
9.  Create "lambda/index.ts" to define a lambda function which is going to used as pre signup trigger for user pool

    ```
    const aws = require("aws-sdk");

    exports.handler = (event: any, context: any, callback: any) => {
    console.log(event);
    event.response.autoConfirmUser = true;

    ///If email exists marked it as verified
    if (event.request.userAttributes.hasOwnProperty("email")) {
        event.response.autoVerifyEmail = true;
    }

    ///If phone exists marked it as verified
    if (event.request.userAttributes.hasOwnProperty("phone_number")) {
        event.response.autoVerifyPhone = true;
    }

    // Return to Amazon Cognito
    callback(null, event);
    };
    ```

10. Update "lib/example01_userpool_with_lambda_trigger-stack.ts" to define a lambda function in the stack

    ```
    const authEmailFn = new lambda.Function(this, "authEmailFn", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
    });
    ```

11. Update "lib/example01_userpool_with_lambda_trigger-stack.ts" to define new user pool

    ```
    const userPool = new cognito.UserPool(this, "UserPool", {
      userPoolName: "Step01Test",
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: { email: true }, // Set email as an alias means now you will use email address to authenticate not with username
      userVerification: {
        emailSubject: "Verify your email for our awesome app!",
        emailBody:
          "Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}",
        emailStyle: cognito.VerificationEmailStyle.CODE,
        smsMessage:
          "Hello {username}, Thanks for signing up to our awesome app! Your verification code is {####}",
      },
      lambdaTriggers: {
        preSignUp: authEmailFn,
      },
    });
    ```

12. Deploy the app using `cdk deploy`
13. User pool can be viewed in the cognito console on AWS web
14. Log detail can be viewed in cloud watch for the lambda function
15. Destroy the app using `cdk destroy`

## Reading Material

- [Customizing User Pool Workflows with Lambda Triggers](https://docs.amazonaws.cn/en_us/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html)
