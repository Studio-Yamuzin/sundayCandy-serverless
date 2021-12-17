import { Contemplation, CreateContemplationInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const createContemplation = async (
  userId: string,
  { content, references, range }: CreateContemplationInput,
): Promise<Contemplation> => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const mappedReferences: { key: string }[] = references.map(reference => ({
      key: reference,
    }));
    const createContemplationResult = await prisma.contemplation.create({
      data: {
        writerId: userId,
        references: {
          create: mappedReferences,
        },
        content,
        range,
        churchId: userInfo.churchId,
      },
      include: {
        references: true,
      },
    });

    return {
      id: createContemplationResult.id,
      content: createContemplationResult.content,
      references: createContemplationResult.references.map(
        reference => reference.key,
      ),
      range,
      timeStamp: new Date().getUTCDate().toString(),
    };
  } catch (error) {
    throw new Error('묵상 쓰기에 실패하였습니다.');
  }
};
