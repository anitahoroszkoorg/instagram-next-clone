const Joi = require("joi");

export const uploadPostSchema = Joi.object({
  image: Joi.object().instance(File),
  caption: Joi.string().required().min(3).max(255),
});

export const imageSchema = Joi.object({
  type: Joi.string().valid("image/png", "image/jpeg").required(),
  size: Joi.required(),
});

export const validateUploadPostData = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  console.log("validatepostdata", data);
  console.log("data", data);
  const { error: uploadPostError, values } = uploadPostSchema.validate(data);
  console.log("values", values);
  const image = values.image;
  const { error: imageError, _ } = imageSchema.validate({
    size: image.size,
    type: image.type,
  });
  const error = uploadPostError || imageError;
  return { error, values };
};
