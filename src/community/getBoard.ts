import { Board, GetBoardInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getBoard = async (userId: string, { boardId }: GetBoardInput): Promise<Board> => {
  try {
    const board = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });

    return board;
  } catch (error) {
    throw new Error('게시판 정보를 불러오는 데 실패했어요.');
  }
};
