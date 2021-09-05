import axios from 'axios';

const KAKAO_TOKEN_VERIFICATION_URL = "https://kapi.kakao.com/v1/user/access_token_info";

export const validateToken = async(token: string) => {
  const result = await axios.get(KAKAO_TOKEN_VERIFICATION_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  console.log(JSON.stringify(result.data));
}