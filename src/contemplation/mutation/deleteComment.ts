import { DeleteCommentInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const deleteComment = async (
  userId: string,
  { id }: DeleteCommentInput,
) => {
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id,
      },
    });
    return !!deletedComment;
  } catch (error) {
    throw new Error('댓글 삭제에 실패헀어요.');
  }
};
