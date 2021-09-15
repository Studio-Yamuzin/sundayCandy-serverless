import { dynamodb } from "libs/dynamodb"

export const getProfile = async(userId: string) => {
  const result = await dynamodb.queryByKeys(userId, 'profile');
  if(result.length === 0){
    return result;
  }else{
    return result[0];
  }
}