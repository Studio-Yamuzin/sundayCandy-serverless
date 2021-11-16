import { Contemplation, UpdateContemplationInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';
import { getContemplation } from './getContemplation';

export const updateContemplation = async (
  userId: string,
  { id, text }: UpdateContemplationInput,
): Promise<Contemplation> => {
  try {
    const updateExpression = 'set text = :t';
    const expressionValue = {
      t: text,
    };
    await dynamodb.updateItemByKeys(
      userId,
      id,
      updateExpression,
      expressionValue,
    );

    const contemplation = getContemplation(userId, { id, writer: userId });
    return contemplation;
  } catch (error) {
    throw new Error('묵상 업데이트에 실패했어요.');
  }
};
