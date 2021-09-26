import { getUserChurch } from "@src/church/getUserChurch";
import { Contemplation, CreateContemplationInput } from "@src/types";
import { dynamodb } from "libs/dynamodb";
import timeUuid from 'time-uuid';

export const createContemplation = async(userId: string, {content, references, range}: CreateContemplationInput): Promise<Contemplation> => {
  try{
    const church = await getUserChurch(userId);
    const params = {
      PK: userId,
      SK: `contemplation-${timeUuid()}`,
      church: church.name,
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