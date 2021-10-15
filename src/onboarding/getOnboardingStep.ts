import { getProfile } from "@src/profile/getProfile";

export const getOnboardingStep = async(userId) => {
  const churchCheck = await getProfile(userId);
  let step = "onboarding";
  if(churchCheck.name){
    step = "end";
  }

  return {step};
}