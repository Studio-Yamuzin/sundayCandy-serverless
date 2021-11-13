import { GetRoomMessagesInput, Message, PaginatedMessages } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const getRoomMessages = async (
  userId: string,
  { roomId, key, limit = 20 }: GetRoomMessagesInput,
): Promise<PaginatedMessages> => {
  try {
    const messages = await dynamodb.queryPaginationByBeginsWith(roomId, 'message', {
      down: false,
      limit,
      startKey: key,
    });
    const mappedMessages: Message[] = messages.data.map((message) => ({
      roomId,
      key: message.SK,
      message: message.message,
      photo: message.photo ?? null,
      timeStamp: message.createdAt,
      writer: message.writer,
      type: message.type,
    }));
    return {
      messages: mappedMessages.reverse() ?? [],
      isLast: !messages.meta.hasMoreData,
    };
  } catch (error) {
    throw new Error('메세지 불러오기 실패');
  }
};
