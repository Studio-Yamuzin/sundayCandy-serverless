import { Message, SendMessageInput } from "@src/types";
import { dynamodb } from "libs/dynamodb";
import {ulid} from 'ulid';

export const sendMessage = async(userId: string, {message, photo}: SendMessageInput, roomId: string): Promise<Message> => {
  try{
    await dynamodb.putItem({
      PK: `${roomId}`,
      SK: `message-${ulid()}`,
      message: message,
      photo: photo,
      writer: userId,
      type: 'user',
    });
  
    return {
      roomId: roomId,
      message: message,
      photo: photo,
      timeStamp: new Date().toISOString(),
      type: 'user',
      writer: userId,
    }
  }catch(error){
    new Error("메시지 보내기에 실패했어요.");
  }
}