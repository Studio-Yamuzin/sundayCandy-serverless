import { GetMyChatRoomInfoInput, RoomInfo } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const getMyChatRoomInfo = async (
  userId: string,
  input: GetMyChatRoomInfoInput,
): Promise<RoomInfo> => {
  try {
    const roomInfo = await dynamodb.queryByPK(input.roomId);
    if (roomInfo?.[0]) {
      return {
        roomId: roomInfo[0].PK,
        users: roomInfo[0].users,
        roomType: roomInfo[0].type,
        roomName: roomInfo[0].roomName,
        recentMessage: null,
        unReadCount: 0,
        photo: roomInfo[0].photo,
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error('방 정보를 가져오는데 실패하였습니다.');
  }
};
