import { Church, WatingChurchesInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getWaitingChurches = async ({
  offset,
  limit,
}: WatingChurchesInput): Promise<Church[]> => {
  try {
    const watingChurches = await prisma.church.findMany({
      skip: offset,
      take: limit,
      where: {
        isConfirmed: false,
      },
    });

    return watingChurches ?? [];
  } catch (error) {
    throw new Error('대기중인 교회를 불러오는데 실패했습니다.');
  }
};
