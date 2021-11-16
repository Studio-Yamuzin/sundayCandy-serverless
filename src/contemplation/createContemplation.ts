import { getProfile } from '@src/profile/getProfile';
import { Contemplation, CreateContemplationInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';
import { ulid } from 'ulid';

export const createContemplation = async (
  userId: string,
  { content, references, range }: CreateContemplationInput,
): Promise<Contemplation> => {
  try {
    const contemplationIdentifier = `contemplation-${ulid()}`;
    const { church } = await getProfile(userId);
    const params = {
      PK: userId,
      SK: contemplationIdentifier,
      writer: userId,
      references: references ?? [],
      range: range ?? [],
      content,
      church,
      viewers: [],
      likers: [],
      commenters: [],
    };
    await dynamodb.putItem(params);

    return {
      id: contemplationIdentifier,
      content,
      references,
      range,
      date: new Date().getUTCDate().toString(),
    };
  } catch (error) {
    throw new Error('묵상 쓰기에 실패하였습니다.');
  }
};
