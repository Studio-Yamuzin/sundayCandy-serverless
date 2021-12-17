import { HomeInfo } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getHomeInfo = async (): Promise<HomeInfo> => {
  try {
    const watingChurches = await prisma.church.count({
      where: {
        isConfirmed: false,
      },
    });

    const userCount = await prisma.user.count();

    const churches = await prisma.church.count({
      where: {
        isConfirmed: true,
      },
    });
    return {
      churchCount: churches,
      userCount,
      waitingChurch: watingChurches,
    };
  } catch (error) {
    throw new Error('어드민 홈 정보를 불러오는데 실패했어요.');
  }
};
