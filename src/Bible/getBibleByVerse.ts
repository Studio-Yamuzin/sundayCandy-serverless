import { dynamodb } from 'libs/dynamodb';

interface IParameter {
  title: string;
  chapter: number;
  verse: number;
}

export const getBibleByVerse = async ({
  title,
  chapter,
  verse,
}: IParameter) => {
  try {
    const bibles = await dynamodb.queryByKeys(
      `${title}-${chapter}`,
      `${verse}`,
      {
        tableName: process.env.bibleTableName,
      },
    );
    return bibles;
  } catch (error) {
    throw new Error('성경 읽기에 실패했어요.\n다시 시도해 주세요.');
  }
};
