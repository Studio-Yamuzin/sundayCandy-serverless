import { Contemplation, GetContemplationInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getContemplation = async (
  userId: string,
  { id }: GetContemplationInput,
): Promise<Contemplation> => {
  try {
    const contemplationQueryResult = await prisma.contemplation.findUnique({
      where: {
        id,
      },
      include: {
        writer: true,
        references: true,
        comments: {
          include: {
            recomments: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
      },
    });
    const references = contemplationQueryResult.references.map(
      (reference) => reference.key,
    );

    const likeUsers = contemplationQueryResult.likes.map((like) => like.userId);
    return {
      id: contemplationQueryResult.id,
      references,
      content: contemplationQueryResult.content,
      commentCount: contemplationQueryResult.comments.length ?? 0,
      comments: contemplationQueryResult.comments,
      timeStamp: contemplationQueryResult.createdAt.toUTCString(),
      likers: likeUsers,
      viewerCount: contemplationQueryResult.viewerCount,
    };
  } catch (error) {
    console.log(error);
    throw new Error('묵상을 불러오는데 실패했어요.');
  }
};
