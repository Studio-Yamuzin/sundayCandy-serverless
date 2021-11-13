import { getProfile } from '@src/profile/getProfile';
import { Church, CreateChurchInput, Maybe } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const createChurch = async (
  userId: string,
  {
    name, type, description, address, phoneNumber,
  }: CreateChurchInput,
): Promise<Maybe<Church>> => {
  try {
    const churchId = `church-${name}`;
    const profile = await getProfile(userId);
    await dynamodb.putItem({
      PK: churchId,
      SK: 'profile',
      name,
      type,
      description,
      address,
      phoneNumber,
    });
    await dynamodb.putItem({
      PK: userId,
      SK: 'church',
      name,
    });
    await dynamodb.putItem({
      ...profile,
      level: '3',
    });

    return {
      name,
      type,
      description,
      address,
      phoneNumber,
    };
  } catch (error) {
    throw new Error('교회 생성에 실패했어요.\n다시 시도해주세요.');
  }
};
