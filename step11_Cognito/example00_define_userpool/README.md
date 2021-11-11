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

## Reading Material

- [Coginto CDK](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-cognito-readme.html)
- [User Pool CDK Contructs](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-cognito.UserPool.html)
