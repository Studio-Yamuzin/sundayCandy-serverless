import { getUserChurch } from "@src/church/getUserChurch";

export const getOnboardingStep = async(userId) => {
  const churchCheck = await getUserChurch(userId);
  let step = "onboarding";
  if(churchCheck.name){
    step = "end";
  }

  return {step};
}