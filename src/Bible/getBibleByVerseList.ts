import { Bible, GetBibleByVerseListInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const getBibleByVerseList = async ({
  keys,
}: GetBibleByVerseListInput): Promise<Bible[]> => {
  try {
    const queryResult = await Promise.all(
      keys.map(async (key) => {
        const bibleKeys = key.split('-');
        const bibleQueryResult = await dynamodb.queryByKeys(
          `${bibleKeys[0]}-${bibleKeys[1]}`,
          `${bibleKeys[2]}`,
          {
            tableName: process.env.bibleTableName,
          },
        );
        return bibleQueryResult[0];
      }),
    );
    return queryResult;
  } catch (error) {
    throw new Error('성경 불러오기에 실패했어요.');
  }
};
