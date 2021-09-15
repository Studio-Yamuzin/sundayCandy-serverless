import { dynamodb } from "libs/dynamodb"

interface IParameter {
  name: string;
  position: string;
  description: string;
  address: string;
  phoneNumber: string;
  type: string;
}

export const createChurch = async(userId, {name, type, description, address, phoneNumber}: IParameter) => {
  const churchId = `church-${name}`;
  await dynamodb.putItem({
    PK: churchId,
    SK: `profile`,
    name,
    type,
    description,
    address,
    phoneNumber,
  });
  await dynamodb.putItem({
    PK: userId,
    SK: 'church',
    name,
  });

  return {
    churchId,
    name,
    type,
    description,
    address,
    phoneNumber,
  }
}