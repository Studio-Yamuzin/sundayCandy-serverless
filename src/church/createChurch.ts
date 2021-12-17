import { Church, CreateChurchInput, Maybe } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';
import { LevelType } from '.prisma/client';

export const createChurch = async (
  userId: string,
  {
    name, type, description, address, phoneNumber,
  }: CreateChurchInput,
): Promise<Maybe<Church>> => {
  try {
    const createChurchResult = await prisma.church.create({
      data: {
        name,
        type,
        description,
        address,
        phoneNumber,
      },
    });

    await prisma.user.create({
      data: {
        id: userId,
        level: LevelType.admin,
        church: {
          connect: {
            id: createChurchResult.id,
          },
        },
      },
    });

    return {
      name: createChurchResult.name,
      type: createChurchResult.type,
      description: createChurchResult.description,
      address: createChurchResult.address,
      phoneNumber: createChurchResult.phoneNumber,
    };
  } catch (error) {
    throw new Error('교회 생성에 실패했어요.\n다시 시도해주세요.');
  }
};
