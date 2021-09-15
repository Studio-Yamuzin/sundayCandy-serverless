import { dynamodb } from "libs/dynamodb"

export const getChurch = async(churchId: string) => {
  const result = await dynamodb.queryByKeys(churchId, 'profile');
  if(result.length === 0){
    return result;
  }else{
    return result[0];
  }
}