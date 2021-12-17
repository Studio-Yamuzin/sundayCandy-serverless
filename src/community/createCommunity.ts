import { Community, CreateCommunityInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const createCommunity = async (
  userId: string,
  { name, photo }: CreateCommunityInput,
): Promise<Community> => {
  try {
    const userChurch = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const createdCommunity = await prisma.community.create({
      data: {
        name,
        photo,
        churchId: userChurch.churchId,
      },
    });
    return {
      id: createdCommunity.id,
      name: createdCommunity.name,
      photo: createdCommunity.photo,
    };
  } catch (error) {
    throw new Error('커뮤니티 만들기에 실패했습니다.');
  }
};
