import { getUserProfile } from '@src/service/Profile/getUsersProfile';
import { RoomInfo } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const getMyChatRooms = async (userId: string): Promise<RoomInfo[]> => {
  try {
    const connections = await dynamodb.queryBySK(`connection-${userId}`);
    try {
      const mappedConnection = await Promise.all(
        connections.map(async (connection): Promise<RoomInfo> => {
          const recentMessage = await dynamodb.queryByBeginsWith(
            connection.PK,
            'message',
          );
          let MappedMessage = null;
          let unReadCount;
          if (recentMessage.length > 0) {
            MappedMessage = {
              roomId: recentMessage[0].PK,
              message: recentMessage[0].message,
              photo: recentMessage[0].photo ?? null,
              timeStamp: recentMessage[0].createdAt,
              writer: recentMessage[0].writer,
              type: recentMessage[0].type,
            };
          }

          const profiles = await getUserProfile(connection.users);

          if (connection.recentReadMessage) {
            unReadCount = recentMessage.findIndex(
              (message) => message.SK === connection.recentReadMessage,
            );
            if (unReadCount !== 0) {
              unReadCount += 1;
            }
          }

          console.log('profiles', JSON.stringify(profiles));

          return {
            roomId: connection.PK,
            recentMessage: MappedMessage,
            unReadCount,
            users: profiles,
            roomType: connection.type,
            roomName: connection.roomName ?? null,
            photo: connection.photo,
          };
        }),
      );
      return mappedConnection.sort(
        (aRoom, bRoom) => new Date(aRoom.recentMessage.timeStamp).getDate()
          - new Date(bRoom.recentMessage.timeStamp).getDate(),
      );
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    throw new Error('채팅방을 가져오는데 실패했습니다.');
  }
};
