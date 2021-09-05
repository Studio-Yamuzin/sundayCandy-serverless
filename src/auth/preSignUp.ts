import {Handler} from 'aws-lambda';
export const main: Handler = async (event) => {
  event.response.autoConfirmUser = true;
  return event;
};