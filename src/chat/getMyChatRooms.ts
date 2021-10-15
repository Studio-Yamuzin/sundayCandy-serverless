import { RoomInfo } from "@src/types";
import { dynamodb } from "libs/dynamodb";

export const getMyChatRooms = async (userId: string): Promise<RoomInfo[]> => {
  try{
    const connections = await dynamodb.queryBySK(`connection-${userId}`);
  
    const mappedConnection = await Promise.all(connections.map(async (connection): Promise<RoomInfo> => {
      const recentMessage = await dynamodb.queryByBeginsWith(connection.PK, 'message');
      console.log(recentMessage);
      const filteredRecentMessage = recentMessage.filter(message => message.type !== "system");
      console.log(filteredRecentMessage);
      return {
        roomId: connection.PK,
        recentMessage: filteredRecentMessage?.[0]?.message ?? null,
        users: connection.users,
        roomType: connection.type,
        roomName: connection.roomName ?? null,
        timeStamp: filteredRecentMessage?.[0]?.updatedAt ?? null,
      }
    }));
  
    return mappedConnection.sort((aRoom, bRoom) => new Date(aRoom.timeStamp).getDate() - new Date(bRoom.timeStamp).getDate());
  }catch(error){
    console.log(error);
    throw new Error("채팅방을 가져오는데 실패했습니다.");
  }
}