import { NewUser } from "@/shared/types/user";

const Joi = require("joi");

export const addUserSchema = Joi.object({
  email: Joi.string(),
  password_hash: Joi.string(),
  username: Joi.string(),
  full_name: Joi.string(),
  user_id: Joi.string(),
});

export const validateAddUserData = (newUser: NewUser) => {
  return addUserSchema.validate(newUser);
};
