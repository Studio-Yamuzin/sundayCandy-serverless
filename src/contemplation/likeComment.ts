import { LikeCommentInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const likeComment = async (
  userId: string,
  { contemplationID, commentID }: LikeCommentInput,
) => {
  try {
    let updateExpression;
    let expressionValue;
    const commentQueryResult = dynamodb.queryByKeys(
      `comment-${contemplationID}`,
      commentID,
    );
    if (commentQueryResult[0].likers.include(userId)) {
      // liker에서 제거
      const deleteIndex = commentQueryResult[0].likers.indexOf(userId);
      updateExpression = 'set likers = :likers';
      expressionValue = {
        likers: commentQueryResult[0].likers
          ?.slice(0, deleteIndex)
          .concat(commentQueryResult[0].likers?.slice(deleteIndex + 1)),
      };
    } else {
      // liker에 추가
      updateExpression = 'set likers = :likers';
      expressionValue = {
        likers: [...commentQueryResult[0].likers, userId],
      };
    }

    const likeCommentQueryResult = await dynamodb.updateItemByKeys(
      `comment-${contemplationID}`,
      commentID,
      updateExpression,
      expressionValue,
    );
    return likeCommentQueryResult;
  } catch (error) {
    throw new Error('댓글 좋아요 요청에 실패했어요.');
  }
};
