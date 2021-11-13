import { getProfile } from "@src/profile/getProfile";
import { OnboardingStep } from "@src/types";

export const getOnboardingStep = async(userId: string): Promise<OnboardingStep> => {
  const churchCheck = await getProfile(userId);
  let step = 'onboarding';
  if(churchCheck.church){
    step = 'end';
  }

  console.log(step);
  return {step: step};
}