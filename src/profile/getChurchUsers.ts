import { Profile } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getChurchUsers = async (userId: string): Promise<Profile[]> => {
  try {
    const userProfile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const churchInfoQuery = await prisma.church.findUnique({
      where: {
        id: userProfile.churchId,
      },
      include: {
        users: true,
      },
    });

    return churchInfoQuery.users;
  } catch (error) {
    throw new Error('신도들을 가져오는데 실패했어요.');
  }
};
