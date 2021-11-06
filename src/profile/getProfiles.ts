import { Profile } from "@src/types";
import { getProfile } from "./getProfile";

export const getProfiles = async (users: string[]): Promise<Profile[]> => {
  try{
    let result = [];
    result = await Promise.all(users.map(async (user)=> {
      return await getProfile(user);
    }));

    console.log('profiles', JSON.stringify(result));

    return result;
  }catch(error){
    console.log(error);
  }
}