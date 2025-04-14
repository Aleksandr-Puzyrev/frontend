export type CreatePasswordParams = {
  hash: string;
  password: string;
  recaptchaToken?: string;
};

export type PasswordConfirmationType = {
  passwordConfirmation: string;
};
