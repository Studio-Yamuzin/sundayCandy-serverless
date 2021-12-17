import { CreateUserIput, Profile } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const createProfile = async (
  userId,
  {
    name, phoneNumber, photo, position, birthDay, church,
  }: CreateUserIput,
): Promise<Profile> => {
  try {
    const updateUserResult = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        churchId: church,
        position,
        name,
        photo,
        birthDay,
        phoneNumber,
      },
    });

    return {
      id: updateUserResult.id,
      name: updateUserResult.name,
      phoneNumber: updateUserResult.phoneNumber,
      photo: updateUserResult.photo,
      birthDay: updateUserResult.birthDay,
      position: updateUserResult.position,
      level: updateUserResult.level,
    };
  } catch (error) {
    throw new Error('유저 정보 입력에 실패했습니다.');
  }
};
