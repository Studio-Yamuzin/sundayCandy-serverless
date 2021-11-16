import { WriteRecommentInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';
import { ulid } from 'ulid';

export const writeRecomment = async (
  userId: string,
  { commentID, text, target }: WriteRecommentInput,
) => {
  try {
    const identifier = ulid();
    const params = {
      PK: `recomment-${commentID}`,
      SK: `recomment-${identifier}-${userId}`,
      writer: userId,
      target,
      text,
      likers: [],
    };
    await dynamodb.putItem(params);
  } catch (error) {
    throw new Error('답글 달기에 실패했습니다.');
  }
};
