import { dynamodb } from "libs/dynamodb"

export const getUserChurch = async(userId: string) => {
  const result = await dynamodb.queryByKeys(userId, "church");
  if(result.length === 0){
    return result;
  }else{
    return result[0];
  }
}