import { Contemplation, DeleteContemplationInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const deleteContemplation = async (
  userId,
  { id }: DeleteContemplationInput,
): Promise<Contemplation> => {
  try {
    const deletedContemplation = await prisma.contemplation.delete({
      where: {
        id,
      },
    });
    return deletedContemplation;
  } catch (error) {
    throw new Error('묵상을 삭제하는 데 실패했어요.');
  }
};
