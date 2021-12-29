import { DeleteBoardInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const deleteBoard = async (userId, { boardId }: DeleteBoardInput) => {
  try {
    const deletedBoard = await prisma.board.delete({
      where: {
        id: boardId,
      },
    });

    return deletedBoard;
  } catch (error) {
    throw new Error('게시판 삭제에 실패했어요.');
  }
};
