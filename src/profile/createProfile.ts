import { CreateUserIput } from "@src/types";
import { dynamodb } from "libs/dynamodb"

export const createProfile = async(userId, {name, phoneNumber, photo, position, birthDay, church}: CreateUserIput) => {
  await dynamodb.putItem({
    PK: userId,
    SK: `profile`,
    name,
    photo,
    position,
    phoneNumber,
    birthDay,
    church,
  });
}