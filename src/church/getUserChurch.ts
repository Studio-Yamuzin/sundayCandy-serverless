import { Church } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getUserChurch = async (userId: string): Promise<Church> => {
  try {
    const userQueryResult = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        church: true,
      },
    });
    return userQueryResult.church;
  } catch (error) {
    throw new Error('교회 찾기 실패');
  }
};
