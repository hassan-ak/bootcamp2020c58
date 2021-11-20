import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import * as lambda from "@aws-cdk/aws-lambda";

export class Example01UserpoolWithLambdaTriggerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const authEmailFn = new lambda.Function(this, "authEmailFn", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
    });

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
  }
}
