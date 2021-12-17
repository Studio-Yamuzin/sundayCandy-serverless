import { Comment, ContemplationCommentsInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getContemplationComments = async (
  userId: string,
  { id }: ContemplationCommentsInput,
): Promise<Comment[]> => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        contemplationId: id,
        parentId: null,
      },
      include: {
        recomments: {
          include: {
            writer: true,
            likes: true,
          },
        },
        writer: true,
        likes: true,
      },
    });

    return comments.map((comment) => ({
      id: comment.id,
      writer: comment.writer,
      text: comment.text,
      likers: comment.likes.map((like) => like.userId),
      recomments: comment.recomments.map((recomment) => ({
        id: recomment.id,
        text: recomment.text,
        writer: recomment.writer,
        likers: recomment.likes.map((like) => like.userId),
        timeStamp: recomment.createdAt.toUTCString(),
      })),
      timeStamp: comment.createdAt.toUTCString(),
    }));
  } catch (error) {
    throw new Error('댓글 불러오기에 실패했어요.');
  }
};
