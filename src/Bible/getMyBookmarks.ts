import { Bookmark } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';
export const getMyBookmarks = async (userId: string): Promise<Bookmark[]> => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return bookmarks.map(bookmark => ({
      id: bookmark.id,
      title: bookmark.title,
      chapter: bookmark.chapter,
      date: bookmark.createdAt.toISOString(),
    }));
  } catch (error) {
    throw new Error('성경 북마크를 가져오는데 실패했어요.');
  }
};
