import { Church } from "@src/types";
import { dynamodb } from "libs/dynamodb"

export const getUserChurch = async(userId: string): Promise<Church> => {
  try{
    const result = await dynamodb.queryByKeys(userId, "church");
    console.log(result);
    if(result.length === 0){
      throw new Error("교회 없음.");
    }else{
      return result[0];
    }
  }catch(error){
    throw new Error("교회 찾기 실패");
  }
}