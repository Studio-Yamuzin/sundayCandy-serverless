import { RoomInfo, UpdateRoomSettingInput } from '@src/types';
import { dynamodb } from 'libs/dynamodb';

export const updateRoomSetting = async (
  userId: string,
  input: UpdateRoomSettingInput,
): Promise<RoomInfo> => {
  const updateExpression = 'set roomName = :r, photoUri = :p';
  const expressionValue = {
    r: input.title,
    p: input.photoUri,
  };

  const result = await dynamodb.updateItemByKeys(
    input.roomId,
    `connection-${userId}`,
    updateExpression,
    expressionValue,
  );
  return {
    roomId: input.roomId,
    roomName: result.roomName,
    photo: result.photoUri,
  };
};
