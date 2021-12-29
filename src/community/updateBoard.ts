import { UpdateBoardInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const updateBoard = async (
  userId: string,
  {
    boardId, boardPresetType, authority, name,
  }: UpdateBoardInput,
) => {
  try {
    const updatedBoard = await prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        name,
        authority,
        boardPreset: boardPresetType,
      },
    });

    return updatedBoard;
  } catch (error) {
    throw new Error('게시판 정보를 업데이트하는데 실패했습니다.');
  }
};
