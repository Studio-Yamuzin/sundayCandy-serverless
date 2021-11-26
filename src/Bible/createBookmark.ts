import { Bookmark, CreateBookmarkInput } from '@src/types';
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

export const createBookmark = async (
  userId: string,
  { chapter, title }: CreateBookmarkInput,
): Promise<Bookmark> => {
  try {
    const createBookmarkResult = await prisma.bookmark.create({
      data: {
        userId,
        chapter,
        title,
      },
    });

    return {
      id: createBookmarkResult.id,
      title: createBookmarkResult.title,
      chapter: createBookmarkResult.chapter,
      date: createBookmarkResult.createdAt.toUTCString(),
    };
  } catch (error) {
    throw new Error('책갈피 생성에 실패했어요.\n다시 시도해주세요.');
  }
};
