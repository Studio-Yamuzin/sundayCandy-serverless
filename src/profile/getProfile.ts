import { Profile } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getProfile = async (userId: string): Promise<Profile> => {
  try {
    const profile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        church: true,
      },
    });

    return profile;
  } catch (error) {
    throw new Error('프로필을 가져오는데 실패했어요.');
  }
};
