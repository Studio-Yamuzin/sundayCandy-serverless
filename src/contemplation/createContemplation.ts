import { getProfile } from "@src/profile/getProfile";
import { Contemplation, CreateContemplationInput } from "@src/types";
import { dynamodb } from "libs/dynamodb";
import {ulid} from 'ulid';

export const createContemplation = async(userId: string, {content, references, range}: CreateContemplationInput): Promise<Contemplation> => {
  try{
    const {church} = await getProfile(userId);
    const params = {
      PK: userId,
      SK: `contemplation-${ulid()}`,
      church: church,
      content: content,
      references: references,
      range: range,
    }
    await dynamodb.putItem(params);
  
    return {
      content,
      references,
      range,
      date: new Date().getUTCDate().toString(),
    }
  }catch(error){
    throw new Error("묵상 쓰기에 실패하였습니다.");
  }
}