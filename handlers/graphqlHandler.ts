import {Handler} from 'aws-lambda';

import { createChurch } from '@src/church/createChurch';
import { createProfile } from '@src/profile/createProfile';
import { getUserChurch } from '@src/church/getUserChurch';
import { getOnboardingStep } from '@src/onboarding/getOnboardingStep';
import { getChurch } from '@src/church/getChurch';
import { getProfile } from '@src/profile/getProfile';

export const main: Handler = async(event, context) => {
  console.log(JSON.stringify(context));
  console.log(`graphqlHandler =>\n{\nfield : '${event.field}',\nuserId : '${event.userId}'\n}`);
  console.log(event);

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
    default:
      return new Error("Wrong Field.");
  }
}