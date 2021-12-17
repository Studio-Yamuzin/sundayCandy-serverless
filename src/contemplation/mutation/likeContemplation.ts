import { LikeContemplationInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const likeContemplation = async (
  userId: string,
  { id }: LikeContemplationInput,
): Promise<String[]> => {
  try {
    const contempation = await prisma.contemplation.findUnique({
      where: {
        id,
      },
      include: {
        likes: true,
      },
    });
    const userLike = contempation.likes.find((item) => item.userId === userId);
    if (userLike) {
      const deleteLikeContemplationResult = await prisma.like.delete({
        where: {
          id: userLike.id,
        },
        include: {
          contemplation: {
            include: {
              likes: {
                select: {
                  userId: true,
                },
              },
            },
          },
        },
      });

      const updatedContemplation = await prisma.contemplation.findUnique({
        where: {
          id,
        },
        include: {
          likes: true,
        },
      });
      return updatedContemplation.likes.map((like) => like.userId);
    }
    const createLikeContemplationResult = await prisma.like.create({
      data: {
        userId,
        contemplationId: id,
      },
      include: {
        contemplation: {
          include: {
            likes: true,
          },
        },
      },
    });

    return createLikeContemplationResult.contemplation.likes.map(
      (like) => like.userId,
    );
  } catch (error) {
    console.log(error);
    throw new Error('묵상 좋아요 요청에 실패했어요.');
  }
};
