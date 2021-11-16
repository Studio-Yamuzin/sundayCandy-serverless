import { DeleteCommentInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const deleteComment = async (
  userId: string,
  { contemplationID, commentID }: DeleteCommentInput,
) => {
  try {
    await dynamodb.deleteItemByKeys(`comment-${contemplationID}`, commentID);
  } catch (error) {
    throw new Error('댓글 삭제에 실패헀어요.');
  }
};
