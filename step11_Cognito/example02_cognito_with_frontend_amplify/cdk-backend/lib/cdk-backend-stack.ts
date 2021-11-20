import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import { UserPoolClient } from "@aws-cdk/aws-cognito";

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // UserPool
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

    //UserPool Client
    const userPoolClient = new cognito.UserPoolClient(
      this,
      "userPoolClient-Amplify",
      {
        userPool,
      }
    );

    // Console Outputs
    new cdk.CfnOutput(this, "User-Pool-Id", {
      value: userPool.userPoolId,
    });
    new cdk.CfnOutput(this, "User-PoolClient-Id", {
      value: userPoolClient.userPoolClientId,
    });
  }
}
