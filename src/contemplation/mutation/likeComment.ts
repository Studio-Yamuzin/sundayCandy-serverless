import { LikeCommentInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const likeComment = async (
  userId: string,
  { id }: LikeCommentInput,
): Promise<String[]> => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
      include: {
        likes: true,
      },
    });
    const userLike = comment.likes.find(item => item.userId === userId);
    if (!userLike) {
      const createLikeResult = await prisma.like.create({
        data: {
          commentId: id,
          userId,
        },
        include: {
          comment: {
            include: {
              likes: true,
            },
          },
        },
      });
      return createLikeResult.comment.likes.map(like => like.userId);
    }
    const deleteLikeResult = await prisma.like.delete({
      where: {
        id: userLike.id,
      },
      include: {
        comment: {
          include: {
            likes: true,
          },
        },
      },
    });
    const updatedComment = await prisma.comment.findUnique({
      where: {
        id,
      },
      include: {
        likes: true,
      },
    });
    return updatedComment.likes.map(like => like.userId);
  } catch (error) {
    console.log('error', error);
    throw new Error('댓글 좋아요 요청에 실패했어요.');
  }
};
