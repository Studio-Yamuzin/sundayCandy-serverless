import { Code } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';
import * as moment from 'moment';

export const getCode = async (userId: string): Promise<Code> => {
  try {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    console.log('limit', now.toISOString());
    const code = await prisma.authenticationCode.findFirst({
      where: {
        makerId: userId,
        createdAt: {
          gt: now,
        },
      },
    });
    console.log('result', code);
    const expiredTime = moment(code.createdAt).add(1, 'hours').toISOString();
    if (code) {
      return {
        createdAt: code.createdAt.toISOString(),
        expiredAt: expiredTime,
        verifyNumber: code.verifyNumber,
        id: code.id,
      };
    }
    return null;
  } catch (error) {
    throw new Error('코드 조회에 실패했습니다.');
  }
};
