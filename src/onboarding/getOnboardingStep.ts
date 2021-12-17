import { OnboardingStep } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';

export const getOnboardingStep = async (
  userId: string,
): Promise<OnboardingStep> => {
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        church: true,
      },
    });
    if (!userInfo) {
      return 'first';
    }
    if (!userInfo.church.isConfirmed) {
      return 'watingConfirm';
    }
    if (!userInfo.name) {
      return 'second';
    }
    return 'done';
  } catch (error) {
    throw new Error('온보딩 단계를 불러오는데 실패했어요.');
  }
};
