import { PreAuthenticationTriggerHandler } from 'aws-lambda';
import axios from 'axios';

const KAKAO_TOKEN_VERIFICATION_URL = "https://kapi.kakao.com/v2/user/me";

export const main: PreAuthenticationTriggerHandler = async(event, context, callback) => {
  console.log(`event info : ${JSON.stringify(event)}`);
  const token = event?.request?.validationData?.token;
  const result = await axios.get(KAKAO_TOKEN_VERIFICATION_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  console.log(result);
  if(result.data.id){
    callback(null, event);
  }else{
    const error = new Error("kakao authentication failed.");
    callback(error, event);
  }
}