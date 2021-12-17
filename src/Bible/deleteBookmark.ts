import { Bookmark, DeleteBookmarkInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const deleteBookmark = async (
  userId: string,
  { id }: DeleteBookmarkInput,
): Promise<Bookmark> => {
  try {
    const deleteResult = await prisma.bookmark.delete({
      where: {
        id,
      },
    });
    return {
      id: deleteResult.id,
      title: deleteResult.title,
      chapter: deleteResult.chapter,
      date: deleteResult.createdAt.toISOString(),
    };
  } catch (error) {
    throw new Error('책갈피 삭제 실패.');
  }
};
