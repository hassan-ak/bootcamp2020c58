# Step 11 Cognito

## Class Notes

AWS cognito is used for user management (signup/signin).Cognito is basedon JWT tokens which are web standards. Amplify and hosted UI csn be used to use cognito in the fronend. There are two thing isn AWS cognito user pools and identity pools. User pools are used for managing users while identity pools are used for configuiring third part identity provider with user pools and giving acces to different AWS services to user pools.

## Sections

- [Define UserPool](./example00_define_userpool)

## Reading Materila

- [Getting Started with User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html)
- [Using Tokens with User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html)
- [Accessing AWS Services Using an Identity Pool After Sign-in](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-integrating-user-pools-with-identity-pools.html)
- [Getting Started with Amazon Cognito Identity Pools (Federated Identities)](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-identity-pools.html)
- [AWS Service Region Availability](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/)
- [AWS cognito module](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-cognito-readme.html)
