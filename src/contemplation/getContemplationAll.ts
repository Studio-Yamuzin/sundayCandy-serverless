import { getProfile } from '@src/profile/getProfile';
import { Contemplation } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const getContemplationAll = async (
  userId: string,
): Promise<Contemplation[]> => {
  try {
    const { church } = await getProfile(userId);
    const result = await dynamodb.queryByBeginsWithChurchIndex(
      church,
      'contemplation',
    );
    const mappedResult = await Promise.all(
      result
        ?.filter((item) => {
          if (item.range === 'public') {
            return item;
          }
        })
        .map(async (item): Promise<Contemplation> => {
          const profile = await getProfile(userId);
          return {
            id: item.SK,
            references: item.references,
            content: item.content,
            date: item.createdAt,
            writer: profile,
            likers: item.likers,
          };
        }),
    );
    return mappedResult.sort(
      (contemplationA, contemplationB) => new Date(contemplationB.date).getTime()
        - new Date(contemplationA.date).getTime(),
    );
  } catch (error) {
    throw new Error('묵상 가져오기에 실패했어요.');
  }
};
