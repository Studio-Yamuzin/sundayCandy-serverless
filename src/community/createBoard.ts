import { Board, CreateBoardInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const createBoard = async (
  userId,
  {
    name, boardPresetType, authority, communityId,
  }: CreateBoardInput,
): Promise<Board> => {
  try {
    const currentBoards = await prisma.board.count({
      where: {
        communityId,
      },
    });
    const createBoardResult = await prisma.board.create({
      data: {
        name,
        boardPreset: boardPresetType,
        authority,
        communityId,
        order: currentBoards + 1,
      },
    });

    return {
      id: createBoardResult.id,
      name: createBoardResult.name,
      boardPreset: createBoardResult.boardPreset,
    };
  } catch (error) {
    throw new Error('게시판을 추가하는 데 실패했어요.');
  }
};
