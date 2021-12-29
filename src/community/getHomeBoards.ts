import { CommunityType } from '@prisma/client';
import { Board } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getHomeBoards = async (userId: string): Promise<Board[]> => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const homeCommunity = await prisma.community.findFirst({
      where: {
        churchId: userInfo.churchId,
        communityType: CommunityType.home,
      },
      include: {
        boards: true,
      },
    });

    const sortedBoards = homeCommunity.boards.sort((aBoard, bBoard) => {
      if (aBoard.order < bBoard.order) {
        return -1;
      }
      return 0;
    });

    return sortedBoards ?? [];
  } catch (error) {
    throw new Error('게시판을 불러오는데 실패했어요.');
  }
};
