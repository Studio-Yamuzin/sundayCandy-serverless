import { DeleteContemplationInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const deleteContemplation = async (
  userId,
  { id }: DeleteContemplationInput,
): Promise<boolean> => {
  // TODO: cron 작업으로 Contemplation PK 없다면, 답글 댓글 데이터 삭제
  try {
    await dynamodb.deleteItemByKeys(
      userId,
      id,
    );
    return true;
  } catch (error) {
    throw new Error('묵상을 삭제하는 데 실패했어요.');
  }
};
