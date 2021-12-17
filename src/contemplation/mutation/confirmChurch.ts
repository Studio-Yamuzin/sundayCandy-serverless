import { Church, ConfirmChurchInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const confirmChurch = async ({
  id,
}: ConfirmChurchInput): Promise<Church> => {
  try {
    const updatedChurch = await prisma.church.update({
      where: {
        id,
      },
      data: {
        isConfirmed: true,
      },
    });
    return {
      name: updatedChurch.name,
      description: updatedChurch.description,
      address: updatedChurch.address,
      phoneNumber: updatedChurch.phoneNumber,
      photo: updatedChurch.imageUri,
      type: updatedChurch.type,
    };
  } catch (error) {
    throw new Error('교회 승인에 실패했습니다.');
  }
};
