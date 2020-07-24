# airasia

# ERD
![erd](https://github.com/jesus-dayo/airasia/blob/master/erd.png?raw=true)


## Setup
### Environment Variables
- create .env file
- add below variables
   - AWS_PROFILE=[AWS Profile]
   - USER_TABLE=[Dynamodb USER Table name]
   - SECRET_KEY=[Any secret key for jwt]
   - ENCRYPTION=[Algorithm encryption]
   - SALT_ROUNDS=[SALT Rounds for encryption]

### AWS Credentials
Add aws keys into your aws/credentials file , please refer to
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
for more details.

### How to run
- checkout code
- run -> npm install
- add .env with environment variables
- run -> npm run test
- run postman collection under /postman
