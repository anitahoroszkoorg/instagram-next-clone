import { NewUser } from "@/globals";

const Joi = require("joi");

export const addUserSchema = Joi.object({
  email: Joi.string(),
  password_hash: Joi.string(),
  username: Joi.string(),
  full_name: Joi.string(),
  custom_id: Joi.string(),
});

export const validateAddUserData = (newUser: NewUser) => {
  // console.log(newUser);
  return addUserSchema.validate(newUser);
};
