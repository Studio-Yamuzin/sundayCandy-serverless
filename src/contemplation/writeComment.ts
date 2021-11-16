import { getProfile } from '@src/profile/getProfile';
import { Comment, WriteCommentInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';
import { ulid } from 'ulid';

export const writeComment = async (
  userId: string,
  { contemplationID, text }: WriteCommentInput,
): Promise<Comment> => {
  try {
    const identifier = ulid();
    const params = {
      PK: contemplationID,
      SK: `comment-${identifier}-${userId}`,
      writer: userId,
      text,
      likers: [],
      commenters: [],
    };
    await dynamodb.putItem(params);
    const userProfile = await getProfile(userId);
    return {
      writer: userProfile,
      text,
      likers: [],
      recomments: [],
    };
  } catch (error) {
    throw new Error('코멘트 작성에 실패했어요.');
  }
};
