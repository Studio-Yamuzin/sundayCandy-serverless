/* eslint-disable no-underscore-dangle */
import { CreateHomeBoardInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const createHomeBoard = async (
  userId: string,
  { name, boardPresetType, authority }: CreateHomeBoardInput,
) => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const homeCommunity = await prisma.community.findFirst({
      where: {
        churchId: userInfo.churchId,
        communityType: 'home',
      },
      include: {
        _count: {
          select: {
            boards: true,
          },
        },
      },
    });
    const createdCommunity = await prisma.board.create({
      data: {
        name,
        boardPreset: boardPresetType,
        authority,
        communityId: homeCommunity.id,
        order: homeCommunity._count.boards + 1,
      },
    });

    console.log('createdCommunity', createdCommunity);
    return createdCommunity;
  } catch (error) {
    throw new Error('게시판 생성에 실패했어요.');
  }
};
