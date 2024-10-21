import Joi from "joi";

export const uploadPostSchema = Joi.object({
  caption: Joi.string().required().min(3).max(255),
});

export const validateUploadPostData = (data: { [key: string]: any }) => {
  const { error, value } = uploadPostSchema.validate({
    caption: data.caption,
  });

  return { error, values: value };
};
