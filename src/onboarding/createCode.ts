import { Code } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';
import * as moment from 'moment';

export const createCode = async (userId: string): Promise<Code> => {
  try {
    const randomNumber = Math.floor(Math.random() * 1000000 + 1).toString();
    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const createCodeResult = await prisma.authenticationCode.create({
      data: {
        verifyNumber: randomNumber,
        churchId: userInfo.churchId,
        makerId: userId,
      },
    });

    const expiredTime = moment(createCodeResult.createdAt)
      .add(1, 'hours')
      .toISOString();

    return {
      id: createCodeResult.id,
      verifyNumber: createCodeResult.verifyNumber,
      createdAt: createCodeResult.createdAt.toUTCString(),
      expiredAt: expiredTime,
    };
  } catch (error) {
    throw new Error('코드 발급에 실패하였습니다.');
  }
};
