import { ExitRoomInput, RoomInfo } from '@src/types';
import { dynamodb } from 'libs/dynamodb';
import { getMyChatRooms } from './getMyChatRooms';

export const exitRoom = async (userId: string, { roomId }: ExitRoomInput) => {
  try {
    await dynamodb.deleteItemByKeys(roomId, `connection-${userId}`);
    const roomInfos: RoomInfo[] = await getMyChatRooms(userId);
    return roomInfos;
  } catch (error) {
    throw new Error('방에서 나가는데 실패했어요.');
  }
};
