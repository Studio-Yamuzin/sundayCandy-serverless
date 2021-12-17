import { prisma } from 'handlers/graphqlHandler';
import { User } from '.prisma/client';

export const getUserProfile = async (users: string[]): Promise<User[]> => {
  const usersResult = await prisma.user.findMany({
    where: {
      id: {
        in: users,
      },
    },
  });

  return usersResult;
};
