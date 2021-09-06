import {Handler} from 'aws-lambda';
export const main: Handler = async (event) => {
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;
  return event;
};