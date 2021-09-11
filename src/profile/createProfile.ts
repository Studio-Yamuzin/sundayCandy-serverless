import { logger } from "@src/modules/logger";
import { dynamodb } from "libs/dynamodb"

interface IMutationArguments {
  userId: string;
  name: string;
  phoneNumber: string;
  photo: string;
  position: string;
}

export const createProfile = async(userId, {name, phoneNumber, photo, position}: IMutationArguments) => {
  await dynamodb.putItem({
    PK: userId,
    SK: `profile`,
    name,
    position,
    phoneNumber,
    photo,
  });
}