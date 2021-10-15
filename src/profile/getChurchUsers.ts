import { Profile } from "@src/types";
import { dynamodb } from "libs/dynamodb";
import { getProfile } from "./getProfile";

export const getChurchUsers = async (userId: string): Promise<Profile[]> => {
  try{
    const myProfile = await getProfile(userId);
    const profiles = await dynamodb.queryByBeginsWithChurchIndex(myProfile.church, 'profile');
  
    const mappedProfile: Profile[] =  profiles.filter((profile)=> {
      if(userId !== profile.PK){
        return {
          PK: profile.PK,
          name: profile.name,
          phoneNumber: profile.phoneNumber,
          photo: profile.photo,
          birthDay: profile.birthDay,
          position: profile.position,
          church: profile.church,
        }
      }
    }) ?? [] as Profile[];
  
    return mappedProfile;
  }catch(error){
    throw new Error("신도들을 가져오는데 실패했어요.");
  }
}