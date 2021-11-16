import { getProfile } from '@src/profile/getProfile';
import { Contemplation, GetContemplationsInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const getContemplations = async (
  userId: string,
  { key, limit }: GetContemplationsInput,
): Promise<Contemplation[]> => {
  try {
    const profile = await getProfile(userId);
    const contemplationQueryResult = await dynamodb.queryPaginationByBeginsWith(
      profile.church,
      'contemplation',
      {
        down: false,
        limit,
        startKey: key,
        index: 'church-SK-index',
      },
    );
    const contemplations = await Promise.all(
      contemplationQueryResult.data.map(
        async (contemplation): Promise<Contemplation> => {
          const writerProfile = await getProfile(contemplation.writer);
          return {
            id: contemplation.SK,
            references: contemplation.references,
            range: contemplation.range,
            date: contemplation.updatedAt,
            writer: writerProfile,
            likers: contemplation.likers,
            viewers: contemplation.viewers,
            commentCount: contemplation.commenters.length,
            comments: [],
          };
        },
      ),
    );

    return contemplations;
  } catch (error) {
    throw new Error('묵상을 가져오는데 실패했어요.');
  }
};
