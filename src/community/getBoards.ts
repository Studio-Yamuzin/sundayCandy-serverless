import { prisma } from 'handlers/graphqlHandler';

export const getBoards = async (userId: string) => {
  try {
    // order 기준 쿼리 필요.
    const boards = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        representCommunity: {
          include: {
            boards: {
              include: {
                posts: true,
              },
            },
          },
        },
      },
    });

    return boards.representCommunity.boards ?? [];
  } catch (error) {
    throw new Error('게시판을 불러오는데 실패했어요.');
  }
};
