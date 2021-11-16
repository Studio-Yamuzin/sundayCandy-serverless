import { DeleteRecommentInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const deleteRecomment = async (
  userId,
  { commentID, recommentID }: DeleteRecommentInput,
): Promise<boolean> => {
  try {
    await dynamodb.deleteItemByKeys(
      `recomment-${commentID}`,
      recommentID,
    );
    return true;
  } catch (error) {
    throw new Error('답글을 삭제하는 데 실패했어요.');
  }
};
