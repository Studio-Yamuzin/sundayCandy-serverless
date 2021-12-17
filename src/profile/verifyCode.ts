import { VerifyCodeInput } from '@src/types';
import { prisma } from 'handlers/graphqlHandler';
import { LevelType } from '.prisma/client';

const moment = require('moment');

export const verifyCode = async (
  userId: string,
  { verifyNumber }: VerifyCodeInput,
) => {
  try {
    console.log('verify input : ', userId, verifyNumber);
    const now = moment();
    const findCode = await prisma.authenticationCode.findFirst({
      where: {
        verifyNumber,
      },
    });
    console.log('code : ', findCode);
    const codeDate = moment(findCode.createdAt.toISOString());
    if (moment.duration(now.diff(codeDate)).hours() > 24) {
      throw new Error('유효한 코드가 아닙니다.\n다시 발급을 요청하세요.');
    } else {
      // make user
      await prisma.user.create({
        data: {
          id: userId,
          level: LevelType.user,
          church: {
            connect: {
              id: findCode.churchId,
            },
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error('코드 인증 실패');
  }
};
