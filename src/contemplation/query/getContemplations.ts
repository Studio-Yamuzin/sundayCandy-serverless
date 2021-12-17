/* eslint-disable no-underscore-dangle */
import { Contemplation, GetContemplationsInput } from '@src/types';
import { RangeType } from '@prisma/client';
import { prisma } from 'handlers/graphqlHandler';

export const getContemplations = async (
  userId: string,
  { key, limit }: GetContemplationsInput,
): Promise<Contemplation[]> => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!key) {
      // initial query
      const initContemplations = await prisma.contemplation.findMany({
        take: limit,
        include: {
          _count: {
            select: {
              comments: true,
            },
          },
          references: true,
          likes: true,
          church: true,
          writer: true,
        },
        where: {
          AND: {
            churchId: userInfo.churchId,
          },
          OR: [
            {
              range: RangeType.public,
            },
            {
              writerId: userId,
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return initContemplations.map((contemplation) => ({
        id: contemplation.id,
        references: contemplation.references.map((reference) => reference.key),
        content: contemplation.content,
        commentCount: contemplation._count.comments,
        viewerCount: contemplation.viewerCount,
        timeStamp: contemplation.createdAt.toUTCString(),
        writer: contemplation.writer,
        range: contemplation.range,
        likers: contemplation.likes.map((like) => like.userId),
      }));
    }
    const contemplations = await prisma.contemplation.findMany({
      take: limit,
      skip: 1,
      cursor: {
        id: key,
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
        references: true,
        likes: true,
        writer: true,
        church: true,
      },
      where: {
        churchId: userInfo.churchId,
        OR: [
          {
            range: RangeType.public,
          },
          {
            writerId: userId,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('when key is valid, contemplations are', contemplations);
    return contemplations.map((contemplation) => ({
      id: contemplation.id,
      references: contemplation.references.map((reference) => reference.key),
      content: contemplation.content,
      commentCount: contemplation._count.comments,
      timeStamp: contemplation.createdAt.toUTCString(),
      writer: contemplation.writer,
      range: contemplation.range,
      likers: contemplation.likes.map((like) => like.userId),
      viewerCount: contemplation.viewerCount,
    }));
  } catch (error) {
    throw new Error('묵상을 가져오는데 실패했어요.');
  }
};
