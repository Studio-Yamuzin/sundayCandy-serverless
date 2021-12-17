import { Contemplation, UpdateContemplationInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';
export const updateContemplation = async (
  userId: string,
  { id, text }: UpdateContemplationInput,
): Promise<Contemplation> => {
  try {
    const updatedContemplation = await prisma.contemplation.update({
      where: { id },
      data: {
        content: text,
      },
    });

    return {
      id: updatedContemplation.id,
      range: updatedContemplation.range,
      content: text,
    };
  } catch (error) {
    throw new Error('묵상 업데이트에 실패했어요.');
  }
};
