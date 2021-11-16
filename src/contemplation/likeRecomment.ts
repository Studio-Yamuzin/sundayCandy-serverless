import { LikeRecommentInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const likeRecomment = async (
  userId: string,
  { recommentID, commentID }: LikeRecommentInput,
) => {
  try {
    let updateExpression;
    let expressionValue;
    const recommentQueryResult = dynamodb.queryByKeys(
      `recomment-${commentID}`,
      recommentID,
    );
    if (recommentQueryResult[0].likers.include(userId)) {
      // liker에서 제거
      const deleteIndex = recommentQueryResult[0].likers.indexOf(userId);
      updateExpression = 'set likers = :likers';
      expressionValue = {
        likers: recommentQueryResult[0].likers
          ?.slice(0, deleteIndex)
          .concat(recommentQueryResult[0].likers?.slice(deleteIndex + 1)),
      };
    } else {
      // liker에 추가
      updateExpression = 'set likers = :likers';
      expressionValue = {
        likers: [...recommentQueryResult[0].likers, userId],
      };
    }

    const likeCommentQueryResult = await dynamodb.updateItemByKeys(
      `comment-${commentID}`,
      recommentID,
      updateExpression,
      expressionValue,
    );
    return likeCommentQueryResult;
  } catch (error) {
    throw new Error('댓글 좋아요 요청에 실패했어요.');
  }
};
