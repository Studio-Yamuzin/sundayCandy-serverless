import { createMessageHelper } from "@src/service/Message";
import {RoomInfo, CreateRoomInput} from "@src/types";
import { dynamodb } from "libs/dynamodb";
import uuid from 'time-uuid';

export const createGeneralRoom = async(userId, {users, name}: CreateRoomInput): Promise<RoomInfo> => {
  try{
    const roomId = uuid();
    await Promise.all(
      [
        dynamodb.putItem({
          PK: roomId,
          SK: `room`,
          type: 'general',
        }),
        dynamodb.putItem({
          PK: roomId,
          SK: `connection-${userId}`,
          roomName: name,
          users: [...users, userId],
          type: 'general',
        }),
        users.map(async (user)=> {
          return await dynamodb.putItem({
            PK: roomId,
            SK: `connection-${user}`,
            roomName: name,
            users: [...users, userId],
            type: 'general'
          });
        }),
      ]
    );
    await createMessageHelper({
      writer: userId,
      roomId: roomId,
      type: 'system',
      message: `${name ?? "새로운"} 채팅방이 개설되었습니다.`,
    });
    return {
      roomId,
      users: [...users, userId],
      roomName: name,
      roomType: 'general',
      recentMessage: null,
    }
  }catch(error){
    throw new Error("방 생성에 실패하였습니다.");
  }
}