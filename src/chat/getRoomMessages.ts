import { GetRoomMessagesInput, Message } from "@src/types"
import { dynamodb } from "libs/dynamodb"

export const getRoomMessages = async (userId: string, {roomId}:GetRoomMessagesInput): Promise<Message[]> => {
  try{
    const messages = await dynamodb.queryByBeginsWith(roomId, "message", {
      down: true,
    });
    const mappedMessages: Message[] = messages.map((message)=> {
      return {
        roomId: roomId,
        message: message.message,
        photo: message.photo ?? null,
        timeStamp: message.createdAt,
        writer: message.writer,
        type: message.type,
      }
    });
    return mappedMessages;
  }catch(error){
    throw new Error("메세지 불러오기 실패");
  }
}