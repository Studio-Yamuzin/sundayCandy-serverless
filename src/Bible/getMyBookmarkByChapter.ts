import { Bookmark, GetMyBookmarkByChapterInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getMyBookmarkByChapter = async (
  userId: string,
  { title, chapter }: GetMyBookmarkByChapterInput,
): Promise<Bookmark | null> => {
  try {
    const getBookmarkResult = await prisma.bookmark.findFirst({
      where: {
        userId,
        chapter,
        title,
      },
    });
    if (!getBookmarkResult) {
      return null;
    }
    return {
      id: getBookmarkResult.id,
      title: getBookmarkResult.title,
      chapter: getBookmarkResult.chapter,
      date: getBookmarkResult.createdAt.toISOString(),
    };
  } catch (error) {
    throw new Error('성경 북마크를 가져오는데 실패했어요.');
  }
};
