import { createMessageHelper } from '@src/service/Message';
import { getUserProfile } from '@src/service/Profile/getUsersProfile';
import { RoomInfo, CreateRoomInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';
import { ulid } from 'ulid';

export const createGeneralRoom = async (
  userId,
  { users, name, photoUri }: CreateRoomInput,
): Promise<RoomInfo> => {
  try {
    const roomId = ulid();
    await Promise.all([
      dynamodb.putItem({
        PK: roomId,
        SK: 'room',
        type: 'general',
      }),
      dynamodb.putItem({
        PK: roomId,
        SK: `connection-${userId}`,
        roomName: name,
        users: [...users, userId],
        type: 'general',
        photo: photoUri,
      }),
      users.map(async (user) => dynamodb.putItem({
        PK: roomId,
        SK: `connection-${user}`,
        roomName: name,
        users: [...users, userId],
        type: 'general',
        photo: photoUri,
      })),
    ]);
    await createMessageHelper({
      writer: userId,
      roomId,
      type: 'system',
      message: `${name ?? '새로운'} 채팅방이 개설되었습니다.`,
    });
    const profiles = await getUserProfile([...users, userId]);
    return {
      roomId,
      users: profiles,
      roomName: name,
      roomType: 'general',
      recentMessage: null,
      unReadCount: 0,
    };
  } catch (error) {
    throw new Error('방 생성에 실패하였습니다.');
  }
};
