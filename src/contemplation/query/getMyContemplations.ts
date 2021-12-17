/* eslint-disable no-underscore-dangle */
import { Contemplation } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getMyContemplations = async (
  userId: string,
): Promise<Contemplation[]> => {
  try {
    const myContemplations = await prisma.contemplation.findMany({
      where: {
        writerId: userId,
      },
      include: {
        likes: true,
        _count: {
          select: {
            comments: true,
          },
        },
        writer: true,
        references: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return myContemplations.map((contemplation) => ({
      id: contemplation.id,
      references: contemplation.references.map((reference) => reference.key),
      content: contemplation.content,
      range: contemplation.range,
      writer: contemplation.writer,
      likers: contemplation.likes.map((like) => like.userId),
      viewerCount: contemplation.viewerCount,
      commentCount: contemplation._count.comments,
      timeStamp: contemplation.createdAt.toISOString(),
    }));
  } catch (error) {
    throw new Error('나의 묵상 가져오기 실패');
  }
};
