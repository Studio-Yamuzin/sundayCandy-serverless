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
import { createContemplation } from '@src/contemplation/mutation/createContemplation';
import { createGeneralRoom } from '@src/chat/createGeneralRoom';
import { sendMessage } from '@src/chat/sendMessage';
import { getChurchUsers } from '@src/profile/getChurchUsers';
import { getMyChatRooms } from '@src/chat/getMyChatRooms';
import { getRoomMessages } from '@src/chat/getRoomMessages';
import { createCode } from '@src/onboarding/createCode';
import { getMyChatRoomInfo } from '@src/chat/getMyChatRoomInfo';
import { updateRoomSetting } from '@src/chat/updateRoomSetting';
import { exitRoom } from '@src/chat/exitRoom';
import { getBibleByVerseList } from '@src/bible/getBibleByVerseList';
import { verifyCode } from '@src/profile/verifyCode';
import { deleteContemplation } from '@src/contemplation/mutation/deleteContemplation';
import { writeRecomment } from '@src/contemplation/mutation/writeRecomment';
import { likeComment } from '@src/contemplation/mutation/likeComment';
import { writeComment } from '@src/contemplation/mutation/writeComment';
import { updateContemplation } from '@src/contemplation/mutation/updateContemplation';
import { likeContemplation } from '@src/contemplation/mutation/likeContemplation';
import { getContemplation } from '@src/contemplation/query/getContemplation';
import { getContemplations } from '@src/contemplation/query/getContemplations';
import { getContemplationComments } from '@src/contemplation/query/getContemplationComments';
import { updateContemplationViewer } from '@src/contemplation/mutation/updateContemplationViewer';
import { deleteComment } from '@src/contemplation/mutation/deleteComment';
import { updateFcmToken } from '@src/profile/updateFcmToken';
import { PrismaClient } from '.prisma/client';
import { getMyContemplations } from '@src/contemplation/query/getMyContemplations';
import { confirmChurch } from '@src/contemplation/mutation/confirmChurch';
import { getHomeInfo } from '@src/admin/getHomeInfo';
import { getWaitingChurches } from '@src/admin/getWaitingChurches';
import { createCommunity } from '@src/community/createCommunity';

export const prisma = new PrismaClient();

export const main: Handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
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
      case 'getBibleByVerseList':
        return await getBibleByVerseList(event.arguments.input);
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
      case 'contemplations':
        return await getContemplations(event.userId, event.arguments.input);
      case 'contemplation':
        return await getContemplation(event.userId, event.arguments.input);
      case 'myContemplations':
        return await getMyContemplations(event.userId);
      case 'contemplationComments':
        return await getContemplationComments(
          event.userId,
          event.arguments.input,
        );
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
        return await createCode(event.userId);
      case 'verifyCode':
        return await verifyCode(event.userId, event.arguments.input);
      case 'getMyChatRoomInfo':
        return await getMyChatRoomInfo(event.userId, event.arguments.input);
      case 'updateRoomSetting':
        return await updateRoomSetting(event.userId, event.arguments.input);
      case 'exitRoom':
        return await exitRoom(event.userId, event.arguments.input);
      case 'likeContemplation':
        return await likeContemplation(event.userId, event.arguments.input);
      case 'updateContemplation':
        return await updateContemplation(event.userId, event.arguments.input);
      case 'updateContemplationViewer':
        return await updateContemplationViewer(
          event.userId,
          event.arguments.input,
        );
      case 'writeComment':
        return await writeComment(event.userId, event.arguments.input);
      case 'likeComment':
        return await likeComment(event.userId, event.arguments.input);
      case 'deleteContemplation':
        return await deleteContemplation(event.userId, event.arguments.input);
      case 'writeRecomment':
        return await writeRecomment(event.userId, event.arguments.input);
      case 'deleteComment':
        return await deleteComment(event.userId, event.arguments.input);
      case 'updateFcmToken':
        return await updateFcmToken(event.userId, event.argumetns.input);
      case 'confirmChurch':
        return await confirmChurch(event.arguments.input);
      case 'homeInfo':
        return await getHomeInfo();
      case 'waitingChurches':
        return await getWaitingChurches(event.arguments.input);
      case 'createCommunity':
        return await createCommunity(event.userId, event.argumetns.input);
      default:
        throw new Error('GraphqlQL Fields are not valid');
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
