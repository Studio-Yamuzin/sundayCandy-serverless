import { getProfile } from "@src/profile/getProfile";
import { Code, CreateCodeInput } from "@src/types";
import { dynamodb } from "libs/dynamodb";
import { ulid } from "ulid";

export const createCode = async(userId: string, {level}: CreateCodeInput): Promise<Code> => {
  try{
    const randomNumber = Math.floor((Math.random() * 1000000) + 1);
    const profile = await getProfile(userId);
    const id = `${profile.church}-${ulid()}`;
    const params = {
      PK: 'code',
      SK: `${id}`,
      level: level,
      code: randomNumber,
    }
    console.log(params);
    await dynamodb.putItem(params);
    return {
      id: id,
      verifyNumber: randomNumber.toString(),
      level: level,
      createdAt: new Date().toISOString(),
    }
  }catch(error){
    throw new Error("코드 발급에 실패하였습니다.");
  }
}