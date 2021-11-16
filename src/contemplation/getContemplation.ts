import { getProfile } from '@src/profile/getProfile';
import {
  Comment, Contemplation, GetContemplationInput,
} from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const getContemplation = async (
  userId: string,
  { id, writer }: GetContemplationInput,
): Promise<Contemplation> => {
  try {
    const contemplationQueryResult = dynamodb.queryByKeys(writer, id);
    const commentsQueryResult = await dynamodb.queryByBeginsWith(
      `comment-${id}`,
      'comment',
    );
    const comments: Comment[] = await Promise.all(commentsQueryResult.map(
      async (commentQueryResult) => {
        const commentWriterProfile = await getProfile(commentQueryResult.writer);
        const recommentsQueryResult = await dynamodb.queryByBeginsWith(
          `recomment-${commentQueryResult.SK}`,
          'recomment',
        );
        return {
          writer: commentWriterProfile,
          text: commentQueryResult.text,
          likers: commentQueryResult.likers,
          recomments: await Promise.all(recommentsQueryResult.map(async (recommentQueryResult) => {
            const recommnetWriterProfile = await getProfile(recommentQueryResult.writer);
            const replyProfile = await getProfile(recommentQueryResult.target);
            return {
              replyProfile,
              writer: recommnetWriterProfile,
              text: recommentQueryResult.text,
              likers: recommentQueryResult.likers,
            };
          })),
        };
      },
    ));
    // 조회수 파악 필요함
    const isViewed = contemplationQueryResult[0].viewers.find(
      (viewer) => viewer === userId,
    );
    if (!isViewed) {
      const updateExpression = 'set viewers = :v';
      const expressionValue = {
        v: [...contemplationQueryResult[0].viewers, userId],
      };
      await dynamodb.updateItemByKeys(
        writer,
        id,
        updateExpression,
        expressionValue,
      );
    }

    // 프로필 반영
    const writerProfile = await getProfile(writer);

    return {
      id: contemplationQueryResult[0].SK,
      references: contemplationQueryResult[0].references,
      content: contemplationQueryResult[0].content,
      range: contemplationQueryResult[0].range,
      date: contemplationQueryResult[0].updatedAt,
      writer: writerProfile,
      likers: contemplationQueryResult[0].likers,
      viewers: isViewed
        ? contemplationQueryResult[0].viewers
        : [...contemplationQueryResult[0].viewers, userId],
      commentCount: contemplationQueryResult[0].commentors.length,
      comments,
    };
  } catch (error) {
    throw new Error('묵상을 불러오는데 실패했어요.');
  }
};
