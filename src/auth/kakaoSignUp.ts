import { APIGatewayProxyHandler } from 'aws-lambda';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import axios from 'axios';

const cognitoServiceProvider = new CognitoIdentityServiceProvider({
  apiVersion: '2016-04-10',
});
const KAKAO_TOKEN_VERIFICATION_URL = "https://kapi.kakao.com/v2/user/me";

export const main: APIGatewayProxyHandler = async (event, context) => {
  const {kakaoAccessToken} = JSON.parse(event.body);
  const result = await axios.get(KAKAO_TOKEN_VERIFICATION_URL, {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
    }
  });

  const GroupName = 'kakao';
  const UserPoolId = `{Cognito's User Pool id}`;  // aws-exports.js의 "aws_user_pools_id"
  const ClientId = `{Cognito's Web client id}`; // aws-exports.js "aws_user_pools_web_client_id"
  const Username = 'kakao_' + result.data.id;
  const newUserParam = {
    ClientId,
    Username,
    Password: result.data.id.toString(),
    ClientMetadata: {
      UserPoolId,
      Username,
      GroupName,
    },
    UserAttributes: [
      {
        Name: 'email' /* required */,
        Value: result.data.kakao_account.email,
      },
      {
        Name: 'name' /* required */,
        Value: Username,
      },
    ],
  };

  const cognitoSignUpResult = cognitoServiceProvider.signUp(newUserParam).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
        success: '카카오 인증 성공!',
        body: cognitoSignUpResult,
    }),
  }
}