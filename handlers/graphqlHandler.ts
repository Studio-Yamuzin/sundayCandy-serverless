import {Handler} from 'aws-lambda';

import { createChurch } from '@src/church/createChurch';
import { createProfile } from '@src/profile/createProfile';
import { getUserChurch } from '@src/church/getUserChurch';
import { getOnboardingStep } from '@src/onboarding/getOnboardingStep';
import { getChurch } from '@src/church/getChurch';
import { getProfile } from '@src/profile/getProfile';
import { getBibleByChapter } from '@src/Bible/getBibleByChapter';
import { getBibleByVerse } from '@src/Bible/getBibleByVerse';
import { createBookmark } from '@src/Bible/createBookmark';
import { deleteBookmark } from '@src/Bible/deleteBookmark';
import { getMyBookmarks } from '@src/Bible/getMyBookmarks';
import { getMyBookmarkByChapter } from '@src/Bible/getMyBookmarkByChapter';
import { createContemplation } from '@src/contemplation/createContemplation';
import { getContemplationAll } from '@src/contemplation/getContemplationAll';

export const main: Handler = async(event, context) => {
  console.log(JSON.stringify(context));
  console.log(`graphqlHandler =>\n{\nfield : '${event.field}',\nuserId : '${event.userId}'\n}`);
  console.log(event);
  try{
    switch(event.field){
      case "createChurch":
        return await createChurch(event.userId, event.arguments.input);
      case "getUserChurch":
        return await getUserChurch(event.userId);
      case "getChurch":
        return await getChurch(event.arguments.input.churchId);
      case "createProfile":
        return await createProfile(event.userId, event.arguments.input);
      case "getProfile":
        return await getProfile(event.userId);
      case "getOnboardingStep":
        return await getOnboardingStep(event.userId);
      case "getBibleByChapter":
        return await getBibleByChapter(event.arguments.input);
      case "getBibleByVerse":
        return await getBibleByVerse(event.arguments.input);
      case "createBookmark":
        return await createBookmark(event.userId, event.arguments.input);
      case "deleteBookmark":
        return await deleteBookmark(event.userId, event.arguments.input);
      case "getMyBookmarks":
        return await getMyBookmarks(event.userId);
      case "getMyBookmarkByChapter":
        return await getMyBookmarkByChapter(event.userId, event.arguments.input);
      case "createContemplation":
        return await createContemplation(event.userId, event.arguments.input);
      case "getContemplationAll":
        return await getContemplationAll(event.userId);
      default:
        throw new Error("Wrong Field.");
    }
  }catch(error){
    console.log(error);
    return error;
  }
}