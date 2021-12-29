import { UpdateBoardsOrderInput, Board } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const updateBoardsOrder = async (
  userId: string,
  { boards }: UpdateBoardsOrderInput,
): Promise<Board[]> => {
  try {
    const result = await prisma.$transaction(
      boards.map((boardId, index) => prisma.board.update({
        where: {
          id: boardId,
        },
        data: {
          order: index + 1,
        },
      })),
    );

    return result;
  } catch (error) {
    throw new Error('게시판 순서 변경에 실패했어요.');
  }
};
