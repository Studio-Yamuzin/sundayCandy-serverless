import { UpdateFcmTokenInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const updateFcmToken = async (
  userId: string,
  { token }: UpdateFcmTokenInput,
) => {
  try {
    const updatedProfile = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        pushToken: token,
      },
    });
    return updatedProfile;
  } catch (error) {
    throw new Error('푸시 토큰 업데이트에 실패했어요.');
  }
};
