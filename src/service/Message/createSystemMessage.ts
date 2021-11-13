import { Message } from "@src/types";
import { dynamodb } from "libs/dynamodb";
import {ulid} from 'ulid';

/*
  서비스 흐름상 메시지를 추가할 때 사용해야 합니다.
  Mutation에 따른 Subscription이 아닌 DB Put / PushAlarm 과 같은 이벤트가 포함됩니다.
*/

interface IParameter {
  writer?: string;
  roomId: string;
  type: string;
  message: string;
  photo?: string;
}

export const createMessage = async ({writer, roomId, type, message, photo}: IParameter): Promise<Message> => {
  const key = `message-${ulid()}`;
  try{
    await dynamodb.putItem({
      PK: roomId,
      SK: key,
      message: message,
      photo,
      type: type,
      writer: writer ?? "system",
    });
  
    return {
      writer,
      key,
      photo,
      timeStamp: new Date().getUTCDate().toString(),
      type,
      roomId,
      message: message,
    }
  }catch(error){
    throw new Error("메시지 생성에 실패했습니다.");
  }
}