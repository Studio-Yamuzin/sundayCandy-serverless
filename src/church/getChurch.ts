import { Church } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getChurch = async (churchId: string): Promise<Church> => {
  try {
    const church = await prisma.church.findUnique({
      where: {
        id: churchId,
      },
    });
    return church;
  } catch (error) {
    throw new Error('교회 찾기에 실패했어요.');
  }
};
