import { Handler } from 'aws-lambda';

import { createChurch } from '@src/church/createChurch';
import { createProfile } from '@src/profile/createProfile';
import { getUserChurch } from '@src/church/getUserChurch';
import { getOnboardingStep } from '@src/onboarding/getOnboardingStep';
import { getChurch } from '@src/church/getChurch';
import { getProfile } from '@src/profile/getProfile';
import { getBibleByChapter } from '@src/bible/getBibleByChapter';
import { getBibleByVerse } from '@src/bible/getBibleByVerse';
import { createBookmark } from '@src/bible/createBookmark';
import { deleteBookmark } from '@src/bible/deleteBookmark';
import { getMyBookmarks } from '@src/bible/getMyBookmarks';
import { getMyBookmarkByChapter } from '@src/bible/getMyBookmarkByChapter';
import { createContemplation } from '@src/contemplation/createContemplation';
import { getContemplationAll } from '@src/contemplation/getContemplationAll';
import { createGeneralRoom } from '@src/chat/createGeneralRoom';
import { sendMessage } from '@src/chat/sendMessage';
import { getChurchUsers } from '@src/profile/getChurchUsers';
import { getMyChatRooms } from '@src/chat/getMyChatRooms';
import { getRoomMessages } from '@src/chat/getRoomMessages';
import { createCode } from '@src/onboarding/createCode';
import { getMyChatRoomInfo } from '@src/chat/getMyChatRoomInfo';
import { updateRoomSetting } from '@src/chat/updateRoomSetting';
import { exitRoom } from '@src/chat/exitRoom';

export const main: Handler = async (event, context) => {
  console.log(JSON.stringify(context));
  console.log(
    `graphqlHandler =>\n{\nfield : '${event.field}',\nuserId : '${event.userId}'\n}`,
  );
  console.log(event);
  try {
    switch (event.field) {
      case 'createChurch':
        return await createChurch(event.userId, event.arguments.input);
      case 'getUserChurch':
        return await getUserChurch(event.userId);
      case 'getChurch':
        return await getChurch(event.arguments.input.churchId);
      case 'createProfile':
        return await createProfile(event.userId, event.arguments.input);
      case 'getProfile':
        return await getProfile(event.userId);
      case 'getOnboardingStep':
        return await getOnboardingStep(event.userId);
      case 'getBibleByChapter':
        return await getBibleByChapter(event.arguments.input);
      case 'getBibleByVerse':
        return await getBibleByVerse(event.arguments.input);
      case 'createBookmark':
        return await createBookmark(event.userId, event.arguments.input);
      case 'deleteBookmark':
        return await deleteBookmark(event.userId, event.arguments.input);
      case 'getMyBookmarks':
        return await getMyBookmarks(event.userId);
      case 'getMyBookmarkByChapter':
        return await getMyBookmarkByChapter(
          event.userId,
          event.arguments.input,
        );
      case 'createContemplation':
        return await createContemplation(event.userId, event.arguments.input);
      case 'getContemplationAll':
        return await getContemplationAll(event.userId);
      case 'createGeneralRoom':
        return await createGeneralRoom(event.userId, event.arguments.input);
      case 'sendMessage':
        return await sendMessage(
          event.userId,
          event.arguments.input,
          event.arguments.roomId,
        );
      case 'getChurchUsers':
        return await getChurchUsers(event.userId);
      case 'getMyChatRooms':
        return await getMyChatRooms(event.userId);
      case 'getRoomMessages':
        return await getRoomMessages(event.userId, event.arguments.input);
      case 'createCode':
        return await createCode(event.userId, event.arguments.input);
      case 'getMyChatRoomInfo':
        return await getMyChatRoomInfo(event.userId, event.arguments.input);
      case 'updateRoomSetting':
        return await updateRoomSetting(event.userId, event.arguments.input);
      case 'exitRoom':
        return await exitRoom(event.userId, event.arguments.input);
      default:
        throw new Error('GraphqlQL Fields are not valid');
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
