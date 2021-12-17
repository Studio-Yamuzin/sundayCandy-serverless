import { Comment, WriteRecommentInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const writeRecomment = async (
  userId: string,
  { commentId, text }: WriteRecommentInput,
): Promise<Comment> => {
  try {
    const writeRecommentResult = await prisma.comment.create({
      data: {
        parentId: commentId,
        text,
        writerId: userId,
      },
    });

    return writeRecommentResult;
  } catch (error) {
    throw new Error('답글 달기에 실패했습니다.');
  }
};
