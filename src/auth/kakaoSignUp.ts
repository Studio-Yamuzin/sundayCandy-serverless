import dynamodb from '@src/modules/dynamodb';
import { APIGatewayProxyHandler } from 'aws-lambda';
import {CognitoIdentityServiceProvider} from 'aws-sdk';
import axios from 'axios';

const cognitoServiceProvider = new CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});
const KAKAO_TOKEN_VERIFICATION_URL = "https://kapi.kakao.com/v2/user/me";

export const main: APIGatewayProxyHandler = async (event, context) => {
  const {accessToken} = JSON.parse(event.body);
  const result = await axios.get(KAKAO_TOKEN_VERIFICATION_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  const GroupName = 'kakao';
  const UserPoolId = `ap-northeast-2_eOsy1c65x`;  // aws-exports.js의 "aws_user_pools_id"
  const ClientId = `204t8opj0rek1k4qb5ca66d6cn`; // aws-exports.js "aws_user_pools_web_client_id"
  const Username = 'kakao_' + result.data.id;
  const newUserParam = {
    ClientId,
    Username,
    Password: Username,
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

  const ddbParams = {
    TableName: process.env.authTableName,
    KeyConditionExpression: "PK = :Username",
    ExpressionAttributeValues: {
      ":Username": Username
    }
  };
  
  const existUser = await dynamodb.query(ddbParams);

  if(existUser.Count === 0){
    await cognitoServiceProvider.signUp(newUserParam).promise();
    await dynamodb.put({
      TableName: process.env.authTableName,
      Item: {
        PK: Username
      }
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      Username: Username
    })
  }
}