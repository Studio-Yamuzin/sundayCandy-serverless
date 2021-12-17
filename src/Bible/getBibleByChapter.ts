import { dynamodb } from 'libs/dynamodb';

interface IParameter {
  title: string;
  chapter: string;
}

export const getBibleByChapter = async ({ title, chapter }: IParameter) => {
  try {
    const bibles = await dynamodb.queryByPK(
      `${title}-${chapter}`,
      process.env.bibleTableName,
    );
    return bibles.sort((a, b) => a.verse - b.verse);
  } catch (error) {
    throw new Error('성경 읽기에 실패했어요.\n다시 시도해 주세요.');
  }
};
