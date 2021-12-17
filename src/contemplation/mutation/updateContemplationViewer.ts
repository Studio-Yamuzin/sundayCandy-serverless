import { UpdateContemplationViewerInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const updateContemplationViewer = async (
  userId: string,
  { id }: UpdateContemplationViewerInput,
) => {
  try {
    const updateContemplationResult = await prisma.contemplation.update({
      where: {
        id,
      },
      data: {
        viewerCount: {
          increment: 1,
        },
      },
    });
    return updateContemplationResult.viewerCount ?? 0;
  } catch (error) {
    throw new Error('조회 중 에러가 발생했어요.');
  }
};
