import { Profile } from "@src/types";
import { dynamodb } from "libs/dynamodb"

export const getProfile = async(userId: string): Promise<Profile> => {
  const result = await dynamodb.queryByKeys(userId, 'profile');
  if(result.length === 0){
    return null;
  }else{
    return result[0];
  }
}