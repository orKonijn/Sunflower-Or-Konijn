export type Gender = "male" | "female";

export interface RegistrationDetails {
  gender: Gender;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerPageLabels = {
  firstName: /^first name:?$/i,
  lastName: /^last name:?$/i,
  email: /^email:?$/i,
  password: /^password:?$/i,
  confirmPassword: /^confirm password:?$/i,
} as const;

export const registerPageRoles = {
  registerButton: { name: /^(?:register)$/i },
  continueButton: { name: /^(?:continue)$/i },
} as const;

export const registerPageSelectors = {
  maleOption: "#gender-male",
  femaleOption: "#gender-female",
  registrationCompletedMessage: ".result",
} as const;
