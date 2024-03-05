const Joi = require("joi");

export const addUserSchema = Joi.object({
  email: Joi.string(),
  password_hash: Joi.string(),
  username: Joi.string(),
  full_name: Joi.string(),
});

export const validatAddUserData = (formData: FormData) => {
  const { error, values } = addUserSchema.validate(formData);
  return { error, values };
};
