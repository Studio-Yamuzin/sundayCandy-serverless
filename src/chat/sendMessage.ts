import { Message, SendMessageInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';
import { ulid } from 'ulid';

export const sendMessage = async (
  userId: string,
  { message, photo }: SendMessageInput,
  roomId: string,
): Promise<Message> => {
  const key = `message-${ulid()}`;
  try {
    await dynamodb.putItem({
      PK: `${roomId}`,
      SK: key,
      message,
      photo,
      writer: userId,
      type: 'user',
    });

    return {
      roomId,
      key,
      message,
      photo,
      timeStamp: new Date().toISOString(),
      type: 'user',
      writer: userId,
    };
  } catch (error) {
    throw new Error('메시지 보내기에 실패했어요.');
  }
};
