import { BoardPresetType, CommunityType } from '@prisma/client';
import { Church, ConfirmChurchInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const confirmChurch = async ({
  id,
}: ConfirmChurchInput): Promise<Church> => {
  try {
    const updatedChurch = await prisma.church.update({
      where: {
        id,
      },
      data: {
        isConfirmed: true,
      },
    });
    if (updatedChurch.id) {
      // 교회 홈 커뮤니티 생성
      const createdCommunity = await prisma.community.create({
        data: {
          churchId: updatedChurch.id,
          name: updatedChurch.name,
          photo: updatedChurch.imageUri,
          communityType: CommunityType.home,
        },
      });

      // 교회 홈 주보 및 공지사항 게시판 생성
      await prisma.board.createMany({
        data: [
          {
            name: '공지사항',
            boardPreset: BoardPresetType.list,
            authority: 'admin',
            communityId: createdCommunity.id,
            order: 1,
          },
          {
            name: '주보',
            boardPreset: BoardPresetType.weeklyInfo,
            authority: 'admin',
            communityId: createdCommunity.id,
            order: 2,
          },
        ],
      });
    }

    return {
      name: updatedChurch.name,
      description: updatedChurch.description,
      address: updatedChurch.address,
      phoneNumber: updatedChurch.phoneNumber,
      photo: updatedChurch.imageUri,
      type: updatedChurch.type,
    };
  } catch (error) {
    throw new Error('교회 승인에 실패했습니다.');
  }
};
