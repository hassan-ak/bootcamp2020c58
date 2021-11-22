import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // User Pool
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

    // Set domain prefix
    const domain = userPool.addDomain("userPoolDomain", {
      cognitoDomain: {
        domainPrefix: "bc2020c58-step03", // SET YOUR OWN Domain PREFIX HERE
      },
    });

    // UserPool Client
    const userPoolClient = new cognito.UserPoolClient(this, "amplifyClient", {
      userPool,
      oAuth: {
        callbackUrls: ["http://localhost:8000/"], // This is what user is allowed to be redirected to with the code upon signin. this can be a list of urls.
        logoutUrls: ["http://localhost:8000/"], // This is what user is allowed to be redirected to after signout. this can be a list of urls.
      },
    });

    // Print Data on console
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

    // define identity provider
    const provider = new cognito.UserPoolIdentityProviderGoogle(
      this,
      "googleProvider",
      {
        userPool: userPool,
        clientId: "Google Client ID", // Google Client id
        clientSecret: "Google Client Secret", // Google Client Secret
        attributeMapping: {
          email: cognito.ProviderAttribute.GOOGLE_EMAIL,
          givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
          phoneNumber: cognito.ProviderAttribute.GOOGLE_PHONE_NUMBERS,
        },
        scopes: ["profile", "email", "openid"],
      }
    );
  }
}
