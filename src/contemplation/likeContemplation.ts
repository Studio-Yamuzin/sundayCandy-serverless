import { LikeContemplationInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const likeContemplation = async (
  userId: string,
  { id, writer }: LikeContemplationInput,
) => {
  try {
    const currentContemplation = await dynamodb.queryByKeys(writer, id);
    let updateExpression;
    let expressionValue;
    if (currentContemplation[0].likers.include(userId)) {
      // liker에서 제거
      const deleteIndex = currentContemplation[0].likers.indexOf(userId);
      updateExpression = 'set likers = :likers';
      expressionValue = {
        likers: currentContemplation[0].likers
          ?.slice(0, deleteIndex)
          .concat(currentContemplation[0].likers?.slice(deleteIndex + 1)),
      };
    } else {
      // liker에 추가
      updateExpression = 'set likers = :likers';
      expressionValue = {
        likers: [...currentContemplation[0].likers, userId],
      };
    }

    const likeContemplationQueryResult = await dynamodb.updateItemByKeys(
      writer,
      id,
      updateExpression,
      expressionValue,
    );
    return likeContemplationQueryResult;
  } catch (error) {
    throw new Error('묵상 좋아요 요청에 실패했어요.');
  }
};
