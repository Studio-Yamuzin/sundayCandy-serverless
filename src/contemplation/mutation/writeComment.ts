import { Comment, WriteCommentInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const writeComment = async (
  userId: string,
  { contemplationID, text }: WriteCommentInput,
): Promise<Comment> => {
  try {
    const writeCommentResult = await prisma.comment.create({
      data: {
        writerId: userId,
        contemplationId: contemplationID,
        text,
      },
      include: {
        writer: true,
      },
    });
    return {
      id: writeCommentResult.id,
      writer: writeCommentResult.writer,
      text,
      likers: [],
      recomments: [],
    };
  } catch (error) {
    throw new Error('코멘트 작성에 실패했어요.');
  }
};
