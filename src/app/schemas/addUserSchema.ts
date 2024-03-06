import { NewUser } from "@/globals";

const Joi = require("joi");

export const addUserSchema = Joi.object({
  email: Joi.string(),
  password_hash: Joi.string(),
  username: Joi.string(),
  full_name: Joi.string(),
});

export const validateAddUserData = (newUser: NewUser) => {
  const { error, values } = addUserSchema.validate(newUser);
  return { error, values };
};
