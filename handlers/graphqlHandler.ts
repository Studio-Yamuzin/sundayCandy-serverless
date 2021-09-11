import {Handler} from 'aws-lambda';

import { createChurch } from '@src/church/createChurch';
import { createProfile } from '@src/profile/createProfile';

export const main: Handler = async(event, context) => {
  console.log(`graphqlHandler =>\n{\nfield : '${event.field}',\nuserId : '${event.userId}'\n}`);
  console.log(event);

  switch(event.field){
    case "createChurch":
      await createChurch(event.userId, event.arguments.input);
    case "getChurch":
    case "createProfile":
      await createProfile(event.userId, event.arguments.input);
    case "getOnboardingStep":
      await getOnboardingStep(event.userId);
  }
}